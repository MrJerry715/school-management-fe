import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-parent-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './parent-dashboard.component.html',
})
export class ParentDashboardComponent {
  parentName = 'Mr. Ahmed Khan';
  childName = 'Aisha Khan';
  childClass = '10th Grade - A';

  childOverview = [
    { label: 'Attendance', value: '96%', status: 'Excellent' },
    { label: 'Total Fees', value: '₨50,000', status: 'Pending' },
    { label: 'GPA', value: '3.8/4.0', status: 'Excellent' },
    { label: 'Assignments', value: '45/45', status: 'Completed' },
  ];

  childFees = [
    { month: 'May 2026', amount: '₨10,000', status: 'Pending', dueDate: 'May 15' },
    { month: 'April 2026', amount: '₨10,000', status: 'Paid', dueDate: 'April 15' },
    { month: 'March 2026', amount: '₨10,000', status: 'Paid', dueDate: 'March 15' },
  ];

  reportCards = [
    { term: 'Mid-Term Physics', score: 92, grade: 'A+', date: 'May 5, 2026' },
    { term: 'Unit Test 1', score: 88, grade: 'A', date: 'April 25, 2026' },
    { term: 'Quiz 3', score: 91, grade: 'A+', date: 'April 15, 2026' },
  ];

  attendanceDetails = [
    { month: 'May', present: 18, total: 20, percentage: 90 },
    { month: 'April', present: 19, total: 20, percentage: 95 },
    { month: 'March', present: 20, total: 20, percentage: 100 },
  ];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
