import {
  ChangeDetectionStrategy,
  Component,
  signal,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
  router = inject(Router);

  username = new FormControl('admin', Validators.required);
  password = new FormControl('', Validators.required);
  errorMessage = signal('');
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
  }

  onLoginClicked() {
    if (this.username.invalid || this.password.invalid) {
      this.errorMessage.set('Please enter both username and password.');
      this.username.markAsTouched();
      this.password.markAsTouched();
      return;
    }

    localStorage.setItem('role', 'admin');
    localStorage.setItem('user', this.username.value || '');
    this.router.navigate(['/']);
  }

  onForgotPasswordClicked() {
    this.errorMessage.set('Password recovery is not configured yet.');
  }
}
