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
      console.error('Registration failed:', error);

      let userFriendlyMessage = 'Registration failed. Please try again.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          userFriendlyMessage = 'This email is already registered. Please log in instead.';
          break;
        case 'auth/invalid-email':
          userFriendlyMessage = 'Invalid email address. Please check your email.';
          break;
        case 'auth/operation-not-allowed':
          userFriendlyMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          userFriendlyMessage = 'Password is too weak. Please use a stronger password.';
          break;
        case 'auth/network-request-failed':
          userFriendlyMessage = 'Network error. Please check your internet connection.';
          break;
        case 'auth/too-many-requests':
          userFriendlyMessage = 'Too many requests. Please try again later.';
          break;
      }

      throw new Error(userFriendlyMessage);
    }
  }
}
