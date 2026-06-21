import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';

import { ParentService } from '../../app/services/parent.service';
import { AuthService } from '../../app/auth/auth.service';
import { StudentProfile } from '../../app/auth/models/user.model';

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
  ],

  templateUrl: './parent-dashboard.component.html',

  styles: [`
    .parent-dashboard {
      background: #ff0b0b;
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
      margin: 8px 0;
    }

    ::ng-deep .mat-mdc-tab-labels {
      background: white;
    }
  `],
})

export class ParentDashboardComponent implements OnInit {

  private readonly parentService = inject(ParentService);
  private readonly authService = inject(AuthService);

  constructor(private router: Router) {}

  parentName = '';
  childName = 'Ali Khan';
  childClass = 'Class 10 - Science';

  children: StudentProfile[] = [];

  childOverview = [
    { label: 'Attendance', value: '95%', status: 'Excellent' },
    { label: 'Average Marks', value: '88%', status: 'Very Good' },
    { label: 'Fee Status', value: 'Paid', status: 'Updated' },
    { label: 'Assignments', value: '45/45', status: 'Completed' },
  ];

  childFees = [
    {
      month: 'May 2026',
      amount: '₨10,000',
      status: 'Pending',
      dueDate: 'May 15'
    },
    {
      month: 'April 2026',
      amount: '₨10,000',
      status: 'Paid',
      dueDate: 'April 15'
    },
    {
      month: 'March 2026',
      amount: '₨10,000',
      status: 'Paid',
      dueDate: 'March 15'
    },
  ];

  reportCards = [
    {
      term: 'Mid-Term Physics',
      score: 92,
      grade: 'A+',
      date: 'May 5, 2026'
    },
    {
      term: 'Unit Test 1',
      score: 88,
      grade: 'A',
      date: 'April 25, 2026'
    },
    {
      term: 'Quiz 3',
      score: 91,
      grade: 'A+',
      date: 'April 15, 2026'
    },
  ];

  attendanceDetails = [
    {
      month: 'May',
      present: 18,
      total: 20,
      percentage: 90
    },
    {
      month: 'April',
      present: 19,
      total: 20,
      percentage: 95
    },
    {
      month: 'March',
      present: 20,
      total: 20,
      percentage: 100
    },
  ];

  ngOnInit(): void {
    this.loadParentData();
  }

  private loadParentData(): void {

    const user = this.authService.currentUser;

    if (user) {

      this.parentName =
        `${user.firstName || user.username} ${user.lastName || ''}`.trim();

      this.parentService.getChildren(user.id).subscribe({

        next: (children) => {
          this.children = children;
        },

        error: (error) => {
          console.error('Error loading children:', error);
        }

      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}