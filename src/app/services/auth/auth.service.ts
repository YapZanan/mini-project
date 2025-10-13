import { Injectable, signal } from '@angular/core';
import { isSessionAvailable } from '../utils/storage.utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = signal<boolean>(false);

  constructor(private router: Router) {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    if (isSessionAvailable()) {
      const user = sessionStorage.getItem('user');
      this.isAuthenticated.set(!!user);
    } else {
      this.isAuthenticated.set(false);
    }
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  logout(): void {
    if (isSessionAvailable()) {
      sessionStorage.removeItem('user');
    }
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  setAuthenticated(value: boolean): void {
    this.isAuthenticated.set(value);
  }
}
