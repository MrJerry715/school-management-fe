import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-management.component.html',
})
export class UserManagementComponent {
  cards = [
    {
      title: 'Students',
      description: 'Manage student registration, profiles, and academic status.',
      icon: '🎓',
      route: '/students',
    },
    {
      title: 'Parents',
      description: 'Track parent contacts, permissions, and communication.',
      icon: '👨‍👩‍👧',
      route: '/user-management',
    },
    {
      title: 'Teachers',
      description: 'Manage teacher records, subjects, and class assignments.',
      icon: '👩‍🏫',
      route: '/teachers',
    },
    {
      title: 'Staff',
      description: 'Manage administrative and support staff profiles.',
      icon: '🧑‍💼',
      route: '/user-management',
    },
  ];
}
