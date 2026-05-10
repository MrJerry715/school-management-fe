import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance.component.html',
})
export class AttendanceComponent {
  attendanceSummary = [
    { label: 'Today Present', value: '1,210', status: 'success' },
    { label: 'Today Absent', value: '46', status: 'warning' },
    { label: 'Average Rate', value: '96%', status: 'info' },
  ];
}
