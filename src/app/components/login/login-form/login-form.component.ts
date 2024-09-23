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
  fb = inject(NonNullableFormBuilder);
  loginForm = this.fb.group({
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  onSubmit() {
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigateByUrl('/overview');
      },
      error: (err) => {
        throw new Error(err);
      },
    });
  }
}
