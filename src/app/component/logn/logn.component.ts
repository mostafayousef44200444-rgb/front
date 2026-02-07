import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './logn.component.html',
  styleUrls: ['./logn.component.css']
})
export class LognComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  showPassword = false;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    // لو المستخدم مسجل دخول، تحويله للملف الشخصي
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/profile']);
      return;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.loginForm.controls; }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMsg = '';

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err) => this.errorMsg = err?.error?.message || 'Login failed. Please try again.'
    });
  }
}
