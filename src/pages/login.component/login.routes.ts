import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login-portal.component').then((m) => m.LoginPortalComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'teacher',
    loadComponent: () =>
      import('./teacher-login.component').then((m) => m.TeacherLoginComponent),
  },
  {
    path: 'parent',
    loadComponent: () =>
      import('./parent-login.component').then((m) => m.ParentLoginComponent),
  },
];
