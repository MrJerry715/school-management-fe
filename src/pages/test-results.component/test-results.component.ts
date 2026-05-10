import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-results.component.html',
})
export class TestResultsComponent {
  testMetrics = [
    { label: 'Total Tests', value: '24', icon: 'description' },
    { label: 'Avg Score', value: '82%', icon: 'grade' },
    { label: 'Passed', value: '22', icon: 'check_circle' },
    { label: 'Pending', value: '2', icon: 'hourglass_empty' },
  ];

  recentTests = [
    { name: 'Physics Mid-Term Exam', date: 'May 8, 2026', totalMarks: 100, scored: 92, percentage: 92, grade: 'A+' },
    { name: 'Mathematics Unit Test 5', date: 'May 5, 2026', totalMarks: 50, scored: 45, percentage: 90, grade: 'A+' },
    { name: 'English Literature Quiz', date: 'May 3, 2026', totalMarks: 40, scored: 32, percentage: 80, grade: 'A' },
    { name: 'Chemistry Lab Practical', date: 'April 30, 2026', totalMarks: 50, scored: 38, percentage: 76, grade: 'B+' },
    { name: 'Biology Exam', date: 'April 28, 2026', totalMarks: 100, scored: 85, percentage: 85, grade: 'A' },
    { name: 'History Test', date: 'April 25, 2026', totalMarks: 75, scored: 62, percentage: 83, grade: 'A' },
  ];

  upcomingTests = [
    { name: 'Computer Science Final', scheduledDate: 'May 20, 2026', subject: 'Computer Science', marks: 100 },
    { name: 'Social Studies Exam', scheduledDate: 'May 22, 2026', subject: 'Social Studies', marks: 100 },
    { name: 'Physical Education Test', scheduledDate: 'May 25, 2026', subject: 'PE', marks: 50 },
  ];
}
