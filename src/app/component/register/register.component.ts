import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  showPassword = false;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  this.registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, { validator: this.passwordMatchValidator });
}


  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  get f() { return this.registerForm.controls; }
  togglePassword() { this.showPassword = !this.showPassword; }

  onSubmit() {
  this.submitted = true;
  this.errorMsg = '';

  if (this.registerForm.invalid) return;

  const payload = {
    firstName: this.registerForm.value.firstName,
    lastName: this.registerForm.value.lastName,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password
  };

  console.log("Registering user payload:", payload);

  this.auth.register(payload).subscribe({
    next: () => this.router.navigate(['/login']),
    error: err => {
      console.error("Registration error:", err);
      this.errorMsg = err?.error?.message || 'Registration failed. Try again.';
    }
  });
}

}

