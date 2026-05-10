import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  metrics = [
    { label: 'Students', value: '1,256', icon: 'school', color: 'bg-blue-100 text-blue-700' },
    { label: 'Teachers', value: '78', icon: 'person', color: 'bg-emerald-100 text-emerald-700' },
    { label: 'Classes', value: '24', icon: 'class', color: 'bg-violet-100 text-violet-700' },
    { label: 'Attendance', value: '96%', icon: 'check_circle', color: 'bg-amber-100 text-amber-700' },
  ];

  quickActions = [
    { label: 'Manage Students', link: '/students' },
    { label: 'Review Attendance', link: '/attendance' },
    { label: 'Assign Teachers', link: '/teachers' },
    { label: 'View Reports', link: '/reports' },
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
}
