import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login';
import { Router } from '@angular/router';
import { sign } from 'crypto';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly loginFormBuilder = inject(FormBuilder);
  private readonly loginService = inject(LoginService);
  loading = signal<boolean>(false);
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  errorMessage = '';

  loginForm = this.loginFormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    if (!email || !password) return;

    this.errorMessage = '';

    try {
      await this.loginService.login(email, password);
      this.loginForm.reset();
      this.loading.set(true);
      this.router.navigate(['/pokemon']);
    } catch (error: any) {
      console.log('sadasdsad');
      this.errorMessage = error?.message || 'Login failed. Please try again.';
      this.loading.set(false);
    } finally {
      console.log('sadasdsad');
      this.loading.set(false);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
