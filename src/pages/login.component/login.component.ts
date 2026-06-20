import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../app/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private router = inject(Router);
  private auth = inject(AuthService);

  // Non-nullable FormControls
  username = new FormControl('admin', {
    nonNullable: true,
    validators: [Validators.required],
  });

  password = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  errorMessage = signal('');
  hide = signal(true);

  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    this.hide.update(value => !value);
  }

  onLoginClicked(): void {
    this.errorMessage.set('');

    if (this.username.invalid || this.password.invalid) {
      this.username.markAsTouched();
      this.password.markAsTouched();
      this.errorMessage.set('Please enter both username and password.');
      return;
    }

    const username = this.username.value;
    const password = this.password.value;

    this.auth.login(username, password).subscribe({
      next: () => {
        const role = this.auth.currentUser?.role?.toLowerCase();

        switch (role) {
          case 'admin':
            this.router.navigate(['/admin/dashboard']);
            break;

          case 'teacher':
            this.router.navigate(['/teacher/dashboard']);
            break;

          case 'parent':
            this.router.navigate(['/parent/dashboard']);
            break;

          default:
            this.router.navigate(['/unauthorized']);
            break;
        }
      },

      error: (err) => {
        console.error(err);
        this.errorMessage.set('Invalid username or password.');
      },
    });
  }

  onForgotPasswordClicked(): void {
    this.errorMessage.set('Password recovery is not configured yet.');
  }
}