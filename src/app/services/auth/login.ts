import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { isSessionAvailable } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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

      console.log('User logged in successfully:', user.email);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
}
