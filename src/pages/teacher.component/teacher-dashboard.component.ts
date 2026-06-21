import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { TeacherService } from '../../app/services/teacher.service';
import { ClassService } from '../../app/services/class.service';
import { StudentService } from '../../app/services/student.service';

import { DataFilteringService } from '../../app/services/data-filtering.service';
import { RoleManagementService } from '../../app/services/role-management.service';

import {
  ClassModel,
  StudentProfile
} from '../../app/auth/models/user.model';

import { AuthService } from '../../app/auth/auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
  ],
  templateUrl: './teacher-dashboard.component.html',
  styles: [`
    .teacher-dashboard {
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
      display: flex;
      align-items: center;
    }

    .class-card {
      cursor: pointer;
      transition: .3s;
    }

    .class-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
    }
  `]
})
export class TeacherDashboardComponent implements OnInit {

  private readonly teacherService = inject(TeacherService);
  private readonly classService = inject(ClassService);
  private readonly authService = inject(AuthService);
  private readonly filterService = inject(DataFilteringService);
  private readonly roleService = inject(RoleManagementService);

  constructor(private router: Router) {}

  teacherName = '';
  subjectTeaching = 'Physics';

  assignedClasses: string[] = [];
  assignedSubjects: string[] = [];

  classCount = 0;
  studentCount = 0;
  pendingTasks = 0;

  // IMPORTANT
  myClasses: any[] = [];

  recentAttendance = [
    {
      date: 'May 9, 2026',
      present: 89,
      absent: 3,
      total: 92
    },
    {
      date: 'May 8, 2026',
      present: 90,
      absent: 2,
      total: 92
    },
    {
      date: 'May 7, 2026',
      present: 87,
      absent: 5,
      total: 92
    }
  ];

  examResults = [
    {
      name: 'Mid-Term Physics',
      date: 'May 5, 2026',
      avgScore: 82
    },
    {
      name: 'Unit Test 1',
      date: 'April 25, 2026',
      avgScore: 78
    },
    {
      name: 'Quiz 3',
      date: 'April 15, 2026',
      avgScore: 85
    }
  ];

  ngOnInit(): void {
    this.loadTeacherData();
  }

  private loadTeacherData(): void {

    const user = this.authService.currentUser;

    if (!user) return;

    this.teacherName =
      `${user.firstName || user.username} ${user.lastName || ''}`.trim();

    this.teacherService.getAssignedClasses(user.id).subscribe({

      next: (classes) => {

        this.myClasses = classes;
        this.classCount = classes.length;

      },

      error: (err) => {
        console.error(err);
      }

    });

    this.teacherService.getAssignedStudents(user.id).subscribe({

      next: (students) => {
        this.studentCount = students.length;
      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}