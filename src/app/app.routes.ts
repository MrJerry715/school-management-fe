import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../pages/login.component/login.routes').then((m) => m.authRoutes),
  },
  {
    path: 'teacher-dashboard',
    loadComponent: () =>
      import('../pages/teacher.component/teacher-dashboard.component').then(
        (m) => m.TeacherDashboardComponent
      ),
  },
  {
    path: 'parent-dashboard',
    loadComponent: () =>
      import('../pages/parent.component/parent-dashboard.component').then(
        (m) => m.ParentDashboardComponent
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('../pages/home.component/home.component').then(
            (m) => m.HomeComponent
          ),
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'students',
        loadComponent: () =>
          import('../pages/students.component/students.component').then(
            (m) => m.StudentsComponent
          ),
        data: { breadcrumb: 'Students' },
      },
      {
        path: 'teachers',
        loadComponent: () =>
          import('../pages/teachers.component/teachers.component').then(
            (m) => m.TeachersComponent
          ),
        data: { breadcrumb: 'Teachers' },
      },
      {
        path: 'classes',
        loadComponent: () =>
          import('../pages/classes.component/classes.component').then(
            (m) => m.ClassesComponent
          ),
        data: { breadcrumb: 'Classes' },
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('../pages/attendance.component/attendance.component').then(
            (m) => m.AttendanceComponent
          ),
        data: { breadcrumb: 'Attendance' },
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('../pages/reports.component/reports.component').then(
            (m) => m.ReportsComponent
          ),
        data: { breadcrumb: 'Reports' },
      },
      {
        path: 'test-results',
        loadComponent: () =>
          import('../pages/test-results.component/test-results.component').then(
            (m) => m.TestResultsComponent
          ),
        data: { breadcrumb: 'Test Results' },
      },
      {
        path: 'fees',
        loadComponent: () =>
          import('../pages/fees.component/fees.component').then(
            (m) => m.FeesComponent
          ),
        data: { breadcrumb: 'Fees' },
      },
      {
        path: 'user-management',
        loadComponent: () =>
          import('../pages/user-management.component/user-management.component').then(
            (m) => m.UserManagementComponent
          ),
        data: { breadcrumb: 'User Management' },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];