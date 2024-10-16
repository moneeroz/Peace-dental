import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  heroAtSymbol,
  heroKey,
  heroArrowRight,
} from '@ng-icons/heroicons/outline';
import { AuthService } from '../../../services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [NgIconComponent, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  providers: [provideIcons({ heroAtSymbol, heroKey, heroArrowRight })],
})
export class LoginFormComponent {
  authService = inject(AuthService);
  router = inject(Router);
  toast = inject(HotToastService);
  fb = inject(NonNullableFormBuilder);

  loginForm = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(
        this.toast.observe({
          loading: 'Logging in...',
          success: 'You are logged in',
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/overview');
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 404) {
            this.toast.close();
            this.toast.error('User not found');
          } else if (err.status == 401) {
            this.toast.close();
            this.toast.error('Invalid credentials');
          } else {
            this.toast.close();
            this.toast.error('Something went wrong');
          }
        },
      });
  }
}
