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

      //check session avail
      if (isSessionAvailable()) {
        sessionStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {}
  }
}
