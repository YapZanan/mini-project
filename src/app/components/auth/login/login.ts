import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login';
import { Router, RouterModule } from '@angular/router';
import { sign } from 'crypto';
import { CanComponentDeactivate } from '../../guard/canDeactivate.guard';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements CanComponentDeactivate {
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
    this.loading.set(true);

    try {
      await this.loginService.login(email, password);
      this.loginForm.reset();
      this.router.navigate(['/pokemon']);
    } catch (error: any) {
      this.errorMessage = error?.message || 'Login failed. Please try again.';
    } finally {
      this.loading.set(false);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  canDeactivate(): boolean {
    if (this.loginForm.dirty) {
      return confirm('You have unsaved login form changes. Are you sure you want to leave?');
    }
    return true;
  }
}
