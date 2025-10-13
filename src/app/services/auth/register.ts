import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { isSessionAvailable } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private readonly auth: Auth = inject(Auth)) {}

  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      const user = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        registeredData: new Date().toISOString(),
      };

      if (isSessionAvailable()) {
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Email already exists.');
        throw new Error('This email is already registered. Please log in instead.');
      } else {
        console.error('Registration failed:', error);
        throw new Error('Registration failed. Please try again.');
      }
    }
  }
}
