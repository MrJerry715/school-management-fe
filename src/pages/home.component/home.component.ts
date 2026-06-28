import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  metrics = [
    { label: 'Students', value: '1,256', icon: 'school', color: 'bg-sky-100 text-sky-700' },
    { label: 'Fees Collected', value: '2.5M', icon: 'payments', color: 'bg-teal-100 text-teal-700' },
    { label: 'Teachers', value: '78', icon: 'person', color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Attendance', value: '96%', icon: 'check_circle', color: 'bg-amber-100 text-amber-700' },
  ];

  quickActions = [
    { label: 'Manage Students', link: '/students', icon: 'groups' },
    { label: 'Review Attendance', link: '/attendance', icon: 'event_available' },
    { label: 'Assign Teachers', link: '/teachers', icon: 'badge' },
    { label: 'View Reports', link: '/reports', icon: 'analytics' },
  ];

  announcements = [
    {
      title: 'Mid-Term Exams Schedule Released',
      description: 'Exams begin on 15th May and rooms are assigned by class teachers.',
      date: 'May 10, 2026',
      type: 'important',
    },
    {
      title: 'Admission Window Open',
      description: 'Admissions are open for the next academic year for Grades 1–12.',
      date: 'May 8, 2026',
      type: 'new',
    },
  ];

  classHealth = [
    { grade: '10th Grade', attendance: 98, result: 84 },
    { grade: '8th Grade', attendance: 94, result: 79 },
    { grade: '5th Grade', attendance: 96, result: 87 },
  ];
}
