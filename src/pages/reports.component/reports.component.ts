import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
})
export class ReportsComponent {
  reports = [
    { title: 'Attendance Summary', description: 'Daily attendance overview for all classes.' },
    { title: 'Exam Performance', description: 'Recent exam results across grades.' },
    { title: 'Fee Collection', description: 'Monthly fee collection and outstanding balance.' },
  ];
}
