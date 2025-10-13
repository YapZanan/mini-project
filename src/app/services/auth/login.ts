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
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
}
