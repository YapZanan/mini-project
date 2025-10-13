import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { isSessionAvailable } from '../utils/storage.utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authService = inject(AuthService);

  constructor(private readonly auth: Auth = inject(Auth)) {}

  async login(email: string, password: string): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

      const user = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        lastLogin: new Date().toISOString(),
      };

      if (isSessionAvailable()) {
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      this.authService.setAuthenticated(true);
      console.log('User logged in successfully:', user.email);
    } catch (error: any) {
      console.error('Error during login:', error);

      let userFriendlyMessage = 'Login failed. Please try again.';

      switch (error.code) {
        case 'auth/invalid-email':
          userFriendlyMessage = 'Invalid email address. Please check your email.';
          break;
        case 'auth/user-disabled':
          userFriendlyMessage = 'This account has been disabled. Please contact support.';
          break;
        case 'auth/user-not-found':
          userFriendlyMessage =
            'No account found with this email. Please check your email or register.';
          break;
        case 'auth/wrong-password':
          userFriendlyMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/too-many-requests':
          userFriendlyMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          userFriendlyMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/invalid-credential':
          userFriendlyMessage = 'Invalid credentials. Please check your email and password.';
          break;
      }

      throw new Error(userFriendlyMessage);
    }
  }
}
