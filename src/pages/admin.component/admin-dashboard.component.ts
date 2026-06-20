import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserService } from '../../app/services/user.service';
import { StudentService } from '../../app/services/student.service';
import { AuthService } from '../../app/auth/auth.service';
import { RoleManagementService } from '../../app/services/role-management.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
  ],
  template: `
    <div class="admin-dashboard p-6">
      <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Stats Cards -->
        <mat-card class="stat-card">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Total Users</p>
                <p class="text-3xl font-bold">{{ stats.totalUsers }}</p>
              </div>
              <mat-icon class="text-blue-500 text-4xl">people</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Total Students</p>
                <p class="text-3xl font-bold">{{ stats.totalStudents }}</p>
              </div>
              <mat-icon class="text-green-500 text-4xl">school</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Total Teachers</p>
                <p class="text-3xl font-bold">{{ stats.totalTeachers }}</p>
              </div>
              <mat-icon class="text-purple-500 text-4xl">person_3</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Total Parents</p>
                <p class="text-3xl font-bold">{{ stats.totalParents }}</p>
              </div>
              <mat-icon class="text-orange-500 text-4xl">family_restroom</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>
        <mat-card class="stat-card">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Active Teachers</p>
                <p class="text-3xl font-bold text-green-600">{{ stats.activeTeachers }}</p>
              </div>
              <mat-icon class="text-green-500 text-4xl">check_circle</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Inactive Teachers</p>
                <p class="text-3xl font-bold text-red-600">{{ stats.inactiveTeachers }}</p>
              </div>
              <mat-icon class="text-red-500 text-4xl">block</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content class="p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Parent Mappings</p>
                <p class="text-3xl font-bold">{{ stats.totalParentMappings }}</p>
              </div>
              <mat-icon class="text-blue-500 text-4xl">family_restroom</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <mat-card>
          <mat-card-header>
            <mat-card-title>User Management</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p class="text-gray-600 mb-4">Manage all users, create new users, and control access.</p>
            <button mat-raised-button color="primary" routerLink="/admin/users">
              <mat-icon>people</mat-icon>
              <span class="ml-2">Manage Users</span>
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Student Management</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p class="text-gray-600 mb-4">View and manage all students, classes, and enrollments.</p>
            <button mat-raised-button color="primary" routerLink="/admin/students">
              <mat-icon>school</mat-icon>
              <span class="ml-2">Manage Students</span>
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Attendance Reports</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p class="text-gray-600 mb-4">View attendance records across all classes.</p>
            <button mat-raised-button color="primary" routerLink="/admin/attendance">
              <mat-icon>event_note</mat-icon>
              <span class="ml-2">View Attendance</span>
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Test Results</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p class="text-gray-600 mb-4">Monitor all test results and student performance.</p>
            <button mat-raised-button color="primary" routerLink="/admin/test-results">
              <mat-icon>assessment</mat-icon>
              <span class="ml-2">View Results</span>
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Fee Management</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p class="text-gray-600 mb-4">Monitor fee collection and payment status.</p>
            <button mat-raised-button color="primary" routerLink="/admin/fees">
              <mat-icon>payment</mat-icon>
              <span class="ml-2">View Fees</span>
            </button>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Reports & Analytics</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p class="text-gray-600 mb-4">Generate comprehensive reports and view analytics.</p>
            <button mat-raised-button color="primary" routerLink="/admin/reports">
              <mat-icon>insert_chart</mat-icon>
              <span class="ml-2">View Reports</span>
            </button>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      background: #f5f5f5;
      min-height: 100vh;
    }

    .stat-card {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    mat-card {
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    button {
      width: 100%;
      justify-content: flex-start;
    }
  `],
})
export class AdminDashboardComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly studentService = inject(StudentService);
  private readonly authService = inject(AuthService);
  private readonly roleService = inject(RoleManagementService);

  stats = {
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalParents: 0,
    activeTeachers: 0,
    inactiveTeachers: 0,
    totalParentMappings: 0,
  };

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    // Load total users
    this.userService.getAll().subscribe({
      next: (res) => {
        this.stats.totalUsers = res.total;
        this.stats.totalTeachers = res.data.filter((u) => u.role === 'teacher').length;
        this.stats.totalParents = res.data.filter((u) => u.role === 'parent').length;
      },
    });

    // Load total students
    this.studentService.getAll().subscribe({
      next: (res) => {
        this.stats.totalStudents = res.total;
      },
    });

    // Load teacher assignments stats
    this.roleService.getTeacherAssignments().subscribe({
      next: (assignments) => {
        this.stats.activeTeachers = assignments.filter((a) => a.status === 'active').length;
        this.stats.inactiveTeachers = assignments.filter((a) => a.status === 'inactive').length;
      },
    });

    // Load parent-child mappings stats
    this.roleService.getParentChildMappings().subscribe({
      next: (mappings) => {
        this.stats.totalParentMappings = mappings.length;
      },
    });
  }
}
