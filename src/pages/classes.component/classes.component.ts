import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classes.component.html',
})
export class ClassesComponent {
  classList = [
    { grade: '10th Grade', section: 'A', teacher: 'Ms. Maria', room: 'A1', students: 32 },
    { grade: 'Grade 5', section: 'B', teacher: 'Mr. Ali', room: 'B1', students: 30 },
    { grade: 'Grade 8', section: 'C', teacher: 'Mrs. Sara', room: 'C2', students: 28 },
    { grade: 'Grade 10', section: 'A', teacher: 'Mr. Shah', room: 'D1', students: 26 },
  ];
}
