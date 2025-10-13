import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  NgZone,
  Renderer2,
  inject,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, fromEvent, of, timer } from 'rxjs';
import { debounceTime, takeUntil, switchMap, catchError } from 'rxjs/operators';

export type ImageLoadingState = 'loading' | 'loaded' | 'error' | 'placeholder';

@Directive({
  selector: 'img[appLazyImage]',
  standalone: true,
})
export class LazyImageDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLImageElement>);
  private readonly ngZone = inject(NgZone);
  private readonly renderer = inject(Renderer2);

  @Input('appLazyImage') imageSrc?: string;
  @Input() placeholderSrc: string =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCAzMkM0MS4zNzIgMzIgMzYgMzcuMzcyIDM2IDQ0QzM2IDUwLjYyOCA0MS4zNzIgNTYgNDggNTZDNTQuNjI4IDU2IDYwIDUwLjYyOCA2MCA0NEM2MCAzNy4zNzIgNTQuNjI4IDMyIDQ4IDMyWk00OCA1MkM0NS43OTEgNTIgNDQgNTAuMjA5IDQ0IDQ4QzQ0IDQ1Ljc5MSA0NS43OTEgNDQgNDggNDRDNTAuMjA5IDQ0IDUyIDQ1Ljc5MSA1MiA0OEM1MiA1MC4yMDkgNTAuMjA5IDUyIDQ4IDUyWiIgZmlsbD0iIzlDQTBCRiIvPgo8cGF0aCBkPSJNNjQgNjRIMzJDMTkuODUxIDY0IDkuNzQyIDUzLjg5MSA5Ljc0MiA0MS43NDJWNDEuNzQyQzkuNzQyIDI5LjU5MyAxOS44NTEgMTkuNDg0IDMyIDE5LjQ4NEg2NEM3Ni4xNDkgMTkuNDg0IDg2LjI1OCAyOS41OTMgODYuMjU4IDQxLjc0MlY0MS43NDJDODYuMjU4IDUzLjg5MSA3Ni4xNDkgNjQgNjQgNjRaIiBmaWxsPSIjOUNBMEJGIi8+Cjwvc3ZnPgo=';
  @Input() errorSrc: string =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRkZFNUU1Ii8+CjxwYXRoIGQ9Ik00OCAzNEM0MC4yOCAzNCAzNCA0MC4yOCAzNCA0OEMzNCA1NS43MiA0MC4yOCA2MiA0OCA2MkM1NS43MiA2MiA2MiA1NS43MiA2MiA0OEM2MiA0MC4yOCA1NS43MiAzNCA0OCAzNFpNNDggNTguNUM0Ni4wNzIgNTguNSA0NC41IDU2LjkyOCA0NC41IDU1QzQ0LjUgNTMuMDcyIDQ2LjA3MiA1MS41IDQ4IDUxLjVDNDkuOTI4IDUxLjUgNTEuNSA1My4wNzIgNTEuNSA1NUM1MS41IDU2LjkyOCA0OS45MjggNTguNSA0OCA1OC41Wk01MS41IDQyLjVINDQuNVYyOEg1MS41VjQyLjVaIiBmaWxsPSIjRkY2QjZCIi8+Cjwvc3ZnPgo=';
  @Input() threshold: number = 0.1;
  @Input() rootMargin: string = '50px';

  private readonly destroy$ = new Subject<void>();
  private readonly loadingState$ = new BehaviorSubject<ImageLoadingState>('placeholder');
  private intersectionObserver: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.initializePlaceholder();
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  private initializePlaceholder(): void {
    this.renderer.setAttribute(this.elementRef.nativeElement, 'src', this.placeholderSrc);
    this.renderer.setAttribute(this.elementRef.nativeElement, 'alt', 'Loading...');
    this.renderer.addClass(this.elementRef.nativeElement, 'opacity-50');
  }

  private setupIntersectionObserver(): void {
    this.ngZone.runOutsideAngular(() => {
      const options: IntersectionObserverInit = {
        threshold: this.threshold,
        rootMargin: this.rootMargin,
      };

      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.ngZone.run(() => {
              this.loadImage();
            });
            this.intersectionObserver?.unobserve(entry.target);
          }
        });
      }, options);

      this.intersectionObserver.observe(this.elementRef.nativeElement);
    });
  }

  private loadImage(): void {
    if (!this.imageSrc) {
      this.handleImageState('error');
      return;
    }

    this.loadingState$.next('loading');
    this.renderer.removeClass(this.elementRef.nativeElement, 'opacity-50');
    this.renderer.addClass(this.elementRef.nativeElement, 'opacity-70');

    of(this.imageSrc)
      .pipe(
        switchMap((src) => {
          return new Observable<ImageLoadingState>((subscriber) => {
            const img = new Image();

            const loadHandler = () => {
              subscriber.next('loaded');
              subscriber.complete();
            };

            const errorHandler = () => {
              subscriber.next('error');
              subscriber.complete();
            };

            img.onload = loadHandler;
            img.onerror = errorHandler;
            img.src = src!;

            return () => {
              img.onload = null;
              img.onerror = null;
            };
          });
        }),
        debounceTime(100),
        catchError(() => of('error' as ImageLoadingState)),
        takeUntil(this.destroy$)
      )
      .subscribe((state) => {
        this.handleImageState(state);
      });
  }

  private handleImageState(state: ImageLoadingState): void {
    this.loadingState$.next(state);

    switch (state) {
      case 'loaded':
        this.renderer.setAttribute(this.elementRef.nativeElement, 'src', this.imageSrc!);
        this.renderer.removeClass(this.elementRef.nativeElement, 'opacity-70');
        this.renderer.addClass(this.elementRef.nativeElement, 'transition-opacity');
        this.renderer.addClass(this.elementRef.nativeElement, 'duration-300');
        break;

      case 'error':
        this.renderer.setAttribute(this.elementRef.nativeElement, 'src', this.errorSrc);
        this.renderer.setAttribute(this.elementRef.nativeElement, 'alt', 'Failed to load image');
        this.renderer.removeClass(this.elementRef.nativeElement, 'opacity-70');
        this.renderer.addClass(this.elementRef.nativeElement, 'opacity-80');
        break;

      case 'loading':
        this.renderer.addClass(this.elementRef.nativeElement, 'opacity-70');
        break;
    }
  }

  load(): void {
    this.loadImage();
  }

  getLoadingState(): Observable<ImageLoadingState> {
    return this.loadingState$.asObservable();
  }
}
