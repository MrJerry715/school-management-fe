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
  selector: 'app-parent-login',
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
  templateUrl: './parent-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentLoginComponent {
  router = inject(Router);

  email = new FormControl('parent@email.com', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  errorMessage = signal('');
  hide = signal(true);

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
  }

  onLoginClicked() {
    if (this.email.invalid || this.password.invalid) {
      this.errorMessage.set('Please enter valid email and password.');
      this.email.markAsTouched();
      this.password.markAsTouched();
      return;
    }

    localStorage.setItem('role', 'parent');
    localStorage.setItem('user', this.email.value || '');
    this.router.navigate(['/parent-dashboard']);
  }
}
