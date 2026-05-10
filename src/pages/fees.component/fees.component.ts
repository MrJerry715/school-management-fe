import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fees.component.html',
})
export class FeesComponent {
  feesSummary = [
    { label: 'Total Annual Fee', value: '₨120,000', status: 'Annual' },
    { label: 'Paid', value: '₨50,000', status: 'Received' },
    { label: 'Pending', value: '₨70,000', status: 'Due' },
    { label: 'Last Payment', value: 'April 15', status: 'Recent' },
  ];

  feeBreakdown = [
    { category: 'Tuition Fee', amount: '₨60,000', percentage: 50 },
    { category: 'Sports & Activities', amount: '₨15,000', percentage: 13 },
    { category: 'Library & IT', amount: '₨20,000', percentage: 17 },
    { category: 'Development Fund', amount: '₨25,000', percentage: 20 },
  ];

  paymentHistory = [
    { month: 'April 2026', amount: '₨10,000', date: 'April 15, 2026', status: 'Paid', method: 'Bank Transfer' },
    { month: 'March 2026', amount: '₨10,000', date: 'March 10, 2026', status: 'Paid', method: 'Online Payment' },
    { month: 'February 2026', amount: '₨10,000', date: 'February 12, 2026', status: 'Paid', method: 'Bank Transfer' },
    { month: 'January 2026', amount: '₨10,000', date: 'January 8, 2026', status: 'Paid', method: 'Cash' },
    { month: 'May 2026', amount: '₨10,000', date: 'Due: May 15, 2026', status: 'Pending', method: '-' },
    { month: 'June 2026', amount: '₨10,000', date: 'Due: June 15, 2026', status: 'Pending', method: '-' },
  ];

  dueMonths = [
    { month: 'May 2026', amount: '₨10,000', dueDate: 'May 15, 2026', daysOverdue: 0 },
    { month: 'June 2026', amount: '₨10,000', dueDate: 'June 15, 2026', daysOverdue: 0 },
    { month: 'July 2026', amount: '₨10,000', dueDate: 'July 15, 2026', daysOverdue: 0 },
  ];
}
