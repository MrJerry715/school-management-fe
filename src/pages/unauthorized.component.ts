import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatIconModule],
  template: `
    <div class="unauthorized-page flex items-center justify-center min-h-screen bg-gray-100">
      <mat-card class="max-w-md">
        <mat-card-content class="text-center p-8">
          <mat-icon class="text-6xl text-red-500 mb-4" [style.fontSize]="'60px'" [style.width]="'60px'" [style.height]="'60px'">
            lock_outline
          </mat-icon>
          <h1 class="text-2xl font-bold mb-2">Access Denied</h1>
          <p class="text-gray-600 mb-6">You don't have permission to access this resource.</p>
          <button mat-raised-button color="primary" routerLink="/">
            <mat-icon>home</mat-icon>
            <span class="ml-2">Go Home</span>
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .unauthorized-page {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    mat-card {
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
  `],
})
export class UnauthorizedComponent {}
