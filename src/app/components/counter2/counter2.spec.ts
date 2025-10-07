import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Counter2 } from './counter2';

describe('Counter2', () => {
  let component: Counter2;
  let fixture: ComponentFixture<Counter2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Counter2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
