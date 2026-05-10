import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './teacher-dashboard.component.html',
})
export class TeacherDashboardComponent {
  teacherName = 'Mrs. Nazia Rafi';
  subjectTeaching = 'Physics';

  myClasses = [
    { name: '10th Grade - A', students: 32 },
    { name: '9th Grade - B', students: 28 },
    { name: '11th Grade - A', students: 30 },
  ];

  recentAttendance = [
    { date: 'May 9, 2026', present: 89, absent: 3, total: 92 },
    { date: 'May 8, 2026', present: 90, absent: 2, total: 92 },
    { date: 'May 7, 2026', present: 87, absent: 5, total: 92 },
  ];

  examResults = [
    { name: 'Mid-Term Physics', date: 'May 5, 2026', avgScore: 82 },
    { name: 'Unit Test 1', date: 'April 25, 2026', avgScore: 78 },
    { name: 'Quiz 3', date: 'April 15, 2026', avgScore: 85 },
  ];

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
