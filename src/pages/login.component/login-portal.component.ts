import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login-portal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login-portal.component.html',
})
export class LoginPortalComponent {
  roles = [
    {
      id: 'admin',
      title: 'Admin Portal',
      description: 'Manage school operations, users, and reports',
      icon: '🛡️',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      id: 'teacher',
      title: 'Teacher Portal',
      description: 'Manage student attendance and performance reports',
      icon: '👨‍🏫',
      color: 'bg-emerald-50 border-emerald-200',
    },
    {
      id: 'parent',
      title: 'Parent Portal',
      description: 'View child\'s attendance, fees, and report cards',
      icon: '👨‍👩‍👧',
      color: 'bg-violet-50 border-violet-200',
    },
  ];

  constructor(private router: Router) {}

  selectRole(roleId: string) {
    this.router.navigate([`/login/${roleId}`]);
  }
}
