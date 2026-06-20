import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../app/auth/auth.service';

@Component({
  selector: 'app-teacher-login',
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
  templateUrl: './teacher-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherLoginComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private auth = inject(AuthService);

  email = new FormControl('teacher@school.com', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
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

    if (this.email.invalid || this.password.invalid) {
      this.email.markAsTouched();
      this.password.markAsTouched();
      this.errorMessage.set('Please enter a valid email and password.');
      return;
    }

    const email = this.email.value;
    const password = this.password.value;

    this.auth.login(email, password).subscribe({
      next: () => {

        const role = this.auth.currentUser?.role?.toLowerCase();

        switch (role) {
          case 'teacher':
            this.router.navigate(['/teacher/dashboard']);
            break;

          case 'admin':
            this.router.navigate(['/admin/dashboard']);
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
        this.errorMessage.set('Invalid email or password.');
      },
    });
  }
}