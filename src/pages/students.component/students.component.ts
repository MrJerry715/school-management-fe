import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
})
export class StudentsComponent {
  overview = [
    { label: 'Total Students', value: '1,256' },
    { label: 'New Admissions', value: '48' },
    { label: 'Pending Fees', value: '37' },
    { label: 'Scholarship Students', value: '76' },
  ];

  recentStudents = [
    { name: 'Aisha Khan', class: '8-A', section: 'A', status: 'Active' },
    { name: 'Rohan Patel', class: '10-B', section: 'B', status: 'Active' },
    { name: 'Sara Ali', class: '7-C', section: 'C', status: 'Pending' },
    { name: 'Imran Sheikh', class: '9-A', section: 'A', status: 'Active' },
  ];
}
