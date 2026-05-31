import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// Custom validator — checks that password and confirmPassword match
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password        = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    username:        ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email:           ['', [Validators.required, Validators.email]],
    password:        ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  loading     = false;
  error       = '';
  fieldErrors: string[] = [];

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading     = true;
    this.error       = '';
    this.fieldErrors = [];

    const { username, email, password } = this.form.value;

    this.auth.register(username, email, password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.loading = false;

        // Backend returns either { "error": "..." }
        // or { "username": "...", "email": "..." } for validation errors
        if (err.error?.error) {
          this.error = err.error.error;
        } else if (typeof err.error === 'object') {
          this.fieldErrors = Object.values(err.error) as string[];
        } else {
          this.error = 'Something went wrong. Please try again.';
        }
      }
    });
  }

  onGoogleLogin() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  get username()        { return this.form.get('username'); }
  get email()           { return this.form.get('email'); }
  get password()        { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
}