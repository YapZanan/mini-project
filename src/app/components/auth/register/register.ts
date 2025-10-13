import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/auth/register';
import { Router, RouterModule } from '@angular/router';
import { CanComponentDeactivate } from '../../guard/canDeactivate.guard';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent implements CanComponentDeactivate {
  private readonly registerFormBuilder = inject(FormBuilder);
  private readonly registerService = inject(RegisterService);
  loading = signal<boolean>(false);

  constructor(private router: Router) {}

  // loading = false;
  errorMessage = '';

  registerForm = this.registerFormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.registerForm.value;
    if (!email || !password) return;

    this.loading.set(true);

    this.errorMessage = '';

    try {
      await this.registerService.register(email, password);
      this.registerForm.reset();
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = error?.message || 'Registration failed. Please try again.';
    } finally {
      this.loading.set(false);
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  canDeactivate(): boolean {
    if (this.registerForm.dirty) {
      return confirm('You have unsaved registration form changes. Are you sure you want to leave?');
    }
    return true;
  }
}
