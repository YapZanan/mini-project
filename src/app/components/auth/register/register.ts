import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../../services/auth/register';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  private readonly registerFormBuilder = inject(FormBuilder);
  private readonly registerService = inject(RegisterService);

  constructor(private router: Router) {}

  loading = false;
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

    this.loading = true;
    this.errorMessage = '';

    try {
      await this.registerService.register(email, password);
      this.registerForm.reset();
      this.router.navigate(['/register']);
    } catch (error: any) {
      this.errorMessage = error?.message || 'Registration failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
