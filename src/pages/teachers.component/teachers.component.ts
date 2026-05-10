import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers.component.html',
})
export class TeachersComponent {
  summary = [
    { label: 'Teachers', value: 78 },
    { label: 'Active Classes', value: 54 },
    { label: 'New Staff', value: 6 },
    { label: 'Subjects Covered', value: 32 },
  ];

  teacherList = [
    { name: 'Mrs. Nazia Rafi', subject: 'Physics', contact: 'naziar@school.com' },
    { name: 'Mr. Ali Shah', subject: 'Mathematics', contact: 'alishah@school.com' },
    { name: 'Ms. Sana Iqbal', subject: 'English', contact: 'sana@school.com' },
    { name: 'Mr. Kamal Ahmed', subject: 'Computer Science', contact: 'kamal@school.com' },
  ];
}
