import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { StudentService } from '../../app/services/student.service';
import { AuthService } from '../../app/auth/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
  ],
  template: `
    <div class="student-dashboard p-6">
      <h1 class="text-3xl font-bold mb-6">Student Dashboard</h1>

      <!-- Student Info Card -->
      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title>My Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-600 text-sm">Name</p>
              <p class="text-lg font-semibold">{{ userName }}</p>
            </div>
            <div>
              <p class="text-gray-600 text-sm">Email</p>
              <p class="text-lg font-semibold">{{ userEmail }}</p>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Quick Access Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <mat-card class="quick-access">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Attendance</p>
                <p class="text-2xl font-bold">{{ attendance }}%</p>
              </div>
              <mat-icon class="text-blue-500 text-4xl">event_note</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="quick-access">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Test Results</p>
                <p class="text-2xl font-bold">{{ testCount }}</p>
              </div>
              <mat-icon class="text-green-500 text-4xl">assessment</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="quick-access">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Exam Results</p>
                <p class="text-2xl font-bold">{{ examCount }}</p>
              </div>
              <mat-icon class="text-purple-500 text-4xl">school</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="quick-access">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Fee Status</p>
                <p class="text-2xl font-bold" [class.text-green-500]="feeStatus === 'Paid'">
                  {{ feeStatus }}
                </p>
              </div>
              <mat-icon class="text-orange-500 text-4xl">payment</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <mat-card>
          <mat-card-header>
            <mat-card-title>My Records</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <button mat-button routerLink="/student/profile">
              <mat-icon>person</mat-icon>
              <span class="ml-2">View Profile</span>
            </button>
            <button mat-button routerLink="/student/attendance">
              <mat-icon>event_note</mat-icon>
              <span class="ml-2">Attendance History</span>
            </button>
            <button mat-button routerLink="/student/test-results">
              <mat-icon>assessment</mat-icon>
              <span class="ml-2">Test Results</span>
            </button>
            <button mat-button routerLink="/student/exam-results">
              <mat-icon>school</mat-icon>
              <span class="ml-2">Exam Results</span>
            </button>
            <button mat-button routerLink="/student/fees">
              <mat-icon>payment</mat-icon>
              <span class="ml-2">Fee Records</span>
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Account</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <button mat-button routerLink="/student/edit-profile">
              <mat-icon>edit</mat-icon>
              <span class="ml-2">Edit Profile</span>
            </button>
            <button mat-button routerLink="/student/change-password">
              <mat-icon>lock</mat-icon>
              <span class="ml-2">Change Password</span>
            </button>
            <button mat-button routerLink="/student/messages">
              <mat-icon>mail</mat-icon>
              <span class="ml-2">Messages</span>
            </button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .student-dashboard {
      background: #f5f5f5;
      min-height: 100vh;
    }

    .quick-access {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    mat-card {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    button {
      display: flex;
      align-items: center;
      margin: 8px 0;
    }
  `],
})
export class StudentDashboardComponent implements OnInit {
  private readonly studentService = inject(StudentService);
  private readonly authService = inject(AuthService);

  userName = '';
  userEmail = '';
  attendance = 85;
  testCount = 5;
  examCount = 2;
  feeStatus = 'Pending';

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    const user = this.authService.currentUser;
    if (user) {
      this.userName = `${user.firstName || user.username} ${user.lastName || ''}`.trim();
      this.userEmail = user.email || '';
    }
  }
}
