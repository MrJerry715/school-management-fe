# School Management System - Angular Implementation Guide

## Overview
This is a comprehensive school management system built with:
- **Frontend**: Angular 21 (standalone components)
- **UI Framework**: Angular Material + Tailwind CSS
- **State Management**: BehaviorSubjects + Angular Signals
- **Authentication**: JWT with refresh tokens
- **Architecture**: Modular, role-based access control

---

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── auth.guard.ts                    # Protects authenticated routes
│   │   ├── role.guard.ts                    # Protects role-based routes
│   │   ├── auth.service.ts                  # JWT authentication + session management
│   │   ├── auth.interceptor.ts              # JWT token injection
│   │   └── models/
│   │       └── user.model.ts                # All data models (User, Student, Teacher, etc.)
│   ├── core/
│   │   ├── rbac.service.ts                  # Role-based access control
│   │   └── storage.service.ts               # Local storage management
│   ├── services/                            # All feature services
│   │   ├── student.service.ts
│   │   ├── teacher.service.ts
│   │   ├── parent.service.ts
│   │   ├── class.service.ts
│   │   ├── attendance.service.ts
│   │   ├── test-result.service.ts
│   │   ├── exam.service.ts
│   │   ├── fee.service.ts
│   │   ├── user.service.ts
│   │   ├── notification.service.ts
│   │   └── theme.service.ts
│   ├── pages/
│   │   ├── admin.component/
│   │   │   └── admin-dashboard.component.ts
│   │   ├── student.component/
│   │   │   └── student-dashboard.component.ts
│   │   └── unauthorized.component.ts
│   ├── layout.component/
│   │   ├── layout.component.ts              # Main layout with navigation
│   │   └── layout.component.html
│   ├── app.config.ts                        # App configuration
│   ├── app.routes.ts                        # ALL ROUTES (role-based)
│   └── app.ts                               # Root component
├── pages/
│   ├── login.component/                     # Login page (all roles)
│   ├── home.component/                      # Home page (role-based)
│   ├── admin.component/                     # Admin dashboard
│   ├── teacher.component/                   # Teacher dashboard
│   ├── parent.component/                    # Parent dashboard
│   ├── student.component/                   # Student dashboard
│   ├── [Feature pages]/                     # (Need to create)
│   │   ├── attendance.component/
│   │   ├── test-results.component/
│   │   ├── fees.component/
│   │   └── etc.
├── environments/
│   ├── environment.ts                       # Dev config
│   └── environment.prod.ts                  # Prod config
├── styles.css                               # Global styles
├── main.ts                                  # Bootstrap
└── index.html
```

---

## Key Services & Their Responsibilities

### 1. **AuthService** (`src/app/auth/auth.service.ts`)
- JWT token management
- User login/logout
- Token refresh (silent)
- Permission loading
- Session storage

**Usage:**
```typescript
constructor(private auth: AuthService) {}

// Login
this.auth.login(username, password).subscribe(...)

// Check if logged in
if (this.auth.isLoggedIn()) { ... }

// Get current user
const user = this.auth.currentUser;

// Get user observable
this.auth.user$.subscribe(user => { ... })

// Logout
this.auth.logout();
```

### 2. **RbacService** (`src/app/core/rbac.service.ts`)
- Manages user permissions
- Checks if user has specific permission
- Provides reactive permissions signal

**Usage:**
```typescript
constructor(private rbac: RbacService) {}

// Check single permission
if (this.rbac.has('edit_attendance')) { ... }

// Get reactive permissions
this.rbac.permissions().forEach(perm => console.log(perm))

// Watch permissions change
effect(() => {
  console.log(this.rbac.permissions());
});
```

### 3. **StudentService** (`src/app/services/student.service.ts`)
- CRUD operations for students
- Get students by class
- Get students by parent
- Fetch attendance/test results/fees for a student

**Usage:**
```typescript
constructor(private studentService: StudentService) {}

// Get all students with pagination
this.studentService.getAll(page, limit).subscribe(res => {
  console.log(res.data, res.total);
});

// Get by class
this.studentService.getByClass(classId).subscribe(students => { ... });

// Get by parent
this.studentService.getByParent(parentId).subscribe(students => { ... });

// Search
this.studentService.search(query).subscribe(results => { ... });
```

### 4. **AttendanceService** (`src/app/services/attendance.service.ts`)
- Mark attendance for class
- Get attendance by class/student
- Update attendance
- Get attendance reports

**Usage:**
```typescript
// Mark attendance
this.attendanceService.markAttendance(classId, date, records).subscribe(...);

// Get by class
this.attendanceService.getByClass(classId, startDate, endDate).subscribe(...);

// Get by student
this.attendanceService.getByStudent(studentId, startDate, endDate).subscribe(...);

// Get report (percentage, days, etc.)
this.attendanceService.getAttendanceReport(studentId).subscribe(report => {
  console.log(report.percentage, report.presentDays);
});
```

### 5. **TestResultService** & **ExamService**
Similar to AttendanceService, handle:
- Create/update test and exam results
- Get by student/class
- Bulk create
- Performance analytics

### 6. **FeeService** (`src/app/services/fee.service.ts`)
- CRUD for fee records
- Get by student/parent/class
- Record payments
- Get fee reports
- Calculate due amounts

**Usage:**
```typescript
// Record payment
this.feeService.recordPayment(feeId, amount, paymentDate).subscribe(...);

// Get due amount
this.feeService.getDueAmount(studentId).subscribe(res => {
  console.log(res.dueAmount);
});

// Get fee report (for parent)
this.feeService.getFeeReport(parentId).subscribe(report => {
  console.log(report.totalPaid, report.totalPending);
});
```

### 7. **NotificationService** (`src/app/services/notification.service.ts`)
- Display toast-like notifications
- Track unread count
- Mark as read

**Usage:**
```typescript
constructor(private notifications: NotificationService) {}

// Show notification
this.notifications.add('Success', 'Attendance marked', 'success');

// Get unread count
const count = this.notifications.unreadCount();

// Watch notifications
this.notifications.notifications$.subscribe(notifs => { ... });
```

### 8. **ThemeService** (`src/app/services/theme.service.ts`)
- Dark/light mode toggle
- Persists user preference

**Usage:**
```typescript
// Toggle theme
this.themeService.toggleTheme();

// Set specific theme
this.themeService.setTheme('dark');

// Watch theme changes
this.themeService.theme$.subscribe(theme => {
  console.log(theme); // 'light' | 'dark'
});
```

---

## Route Protection (Guards)

### AuthGuard
Protects all authenticated routes. Redirects to login if not logged in.

```typescript
{
  path: 'admin',
  canActivate: [AuthGuard, roleGuard(['admin'])],
  // Only accessible if logged in AND user role is 'admin'
}
```

### roleGuard
Protects routes by user role. Redirects to /unauthorized if role doesn't match.

```typescript
{
  path: 'teacher',
  canActivate: [roleGuard(['teacher'])],
  // Only accessible if user role is 'teacher'
}

{
  path: 'parent',
  canActivate: [roleGuard(['parent', 'student'])],
  // Accessible if user role is either 'parent' OR 'student'
}
```

---

## Routing Structure

### Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - User management
- `/admin/students` - Student management
- `/admin/attendance` - Attendance records
- `/admin/test-results` - Test results
- `/admin/fees` - Fee records
- `/admin/reports` - Analytics

### Teacher Routes
- `/teacher/dashboard` - Teacher dashboard
- `/teacher/students` - Class students list
- `/teacher/attendance` - Mark/view attendance
- `/teacher/test-results` - Mark test results

### Parent Routes
- `/parent/dashboard` - Parent dashboard
- `/parent/child/:childId/attendance` - Child's attendance
- `/parent/child/:childId/test-results` - Child's test results
- `/parent/child/:childId/exam-results` - Child's exam results
- `/parent/child/:childId/fees` - Child's fee records
- `/parent/child/:childId/remarks` - Teacher's remarks
- `/parent/child/:childId/progress` - Progress reports

### Student Routes
- `/student/dashboard` - Student dashboard
- `/student/attendance` - My attendance
- `/student/test-results` - My test results
- `/student/fees` - My fee records

### Shared Routes
- `/login` - Login page (all users)
- `/` - Home (redirects to role-specific dashboard)
- `/unauthorized` - Access denied page

---

## Models (Data Structures)

All models are defined in `src/app/auth/models/user.model.ts`:

```typescript
// Main user types
type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string;
  isActive: boolean;
}

interface StudentProfile {
  id: string;
  userId: string;
  rollNumber: string;
  classId: string;
  className: string;
  parentId: string;
  dateOfBirth?: Date;
  address?: string;
}

interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: Date;
  status: 'present' | 'absent' | 'leave';
  remarks?: string;
  markedBy: string;
}

interface TestResult {
  id: string;
  studentId: string;
  classId: string;
  testName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade?: string;
  testDate: Date;
}

interface FeeRecord {
  id: string;
  studentId: string;
  parentId: string;
  month: string;
  year: number;
  amount: number;
  paidAmount: number;
  pendingAmount: number;
  status: 'paid' | 'unpaid' | 'partial';
  dueDate: Date;
  paidDate?: Date;
}

// ... and more (see user.model.ts)
```

---

## Backend API Endpoints

All endpoints are documented in `src/app/API_DOCUMENTATION.ts`

**Base URL:** `http://localhost:3001/api`

**Authentication:** All endpoints (except /auth/login, /auth/register) require:
```
Authorization: Bearer <accessToken>
```

### Key Endpoints

```
POST   /auth/login
POST   /auth/register
POST   /auth/refresh
GET    /auth/me/permissions

GET    /users?page=1&limit=10
POST   /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id

GET    /students?page=1&limit=10
POST   /students
GET    /students/:id
GET    /students/class/:classId
GET    /students/parent/:parentId

POST   /attendance/mark
GET    /attendance?classId=x&startDate=y
PUT    /attendance/:id

POST   /test-results
GET    /test-results/student/:studentId
POST   /test-results/bulk

POST   /fees
GET    /fees/student/:studentId
PUT    /fees/:id/payment

... and many more (see API_DOCUMENTATION.ts for complete list)
```

---

## Creating a New Feature Component

### Example: Teacher's Mark Attendance Page

#### 1. Create Component File
```typescript
// src/pages/teacher/mark-attendance.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ClassService } from '../../app/services/class.service';
import { StudentService } from '../../app/services/student.service';
import { AttendanceService } from '../../app/services/attendance.service';
import { AuthService } from '../../app/auth/auth.service';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Mark Attendance</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="attendance-form">
          <!-- Form content -->
        </div>
      </mat-card-content>
    </mat-card>
  `
})
export class MarkAttendanceComponent implements OnInit {
  private readonly classService = inject(ClassService);
  private readonly studentService = inject(StudentService);
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    // Load data
  }
}
```

#### 2. Add Route
```typescript
// In src/app/app.routes.ts
{
  path: 'teacher',
  canActivate: [AuthGuard, roleGuard(['teacher'])],
  children: [
    {
      path: 'mark-attendance',
      loadComponent: () =>
        import('../pages/teacher/mark-attendance.component').then(
          (m) => m.MarkAttendanceComponent
        ),
    },
    // ... other routes
  ],
}
```

#### 3. Use in Template
```typescript
// In any teacher component
<button [routerLink]="['/teacher/mark-attendance']" mat-raised-button>
  Mark Attendance
</button>
```

---

## Authentication Flow

### 1. Login
```typescript
// User enters credentials
this.auth.login(username, password).subscribe({
  next: (response) => {
    // Tokens stored in localStorage automatically
    // User object available via auth.currentUser
    // Redirected based on role
  }
});
```

### 2. Token Storage
```
localStorage:
- user: JSON stringified user object
- accessToken: JWT token (1 hour expiry)
- refreshToken: Refresh token (7 days expiry)
- permissions: User permissions array
```

### 3. Silent Token Refresh
- AuthService automatically refreshes token 1 minute before expiry
- Uses refreshToken from localStorage
- No user action needed

### 4. API Requests
- All requests automatically include `Authorization: Bearer <token>` header
- Handled by http-error.interceptor.ts

### 5. Logout
```typescript
this.auth.logout();
// Clears all localStorage
// Resets BehaviorSubjects
// Redirects to login
```

---

## Using Signals & Observables

### Pattern 1: Subscribe in Component
```typescript
export class MyComponent implements OnInit {
  private readonly authService = inject(AuthService);
  
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        console.log('User logged in:', user.username);
      }
    });
  }
}
```

### Pattern 2: Use RxJS in Template (async pipe)
```html
<div *ngIf="(authService.user$ | async) as user">
  Welcome {{ user.username }}
</div>
```

### Pattern 3: Angular Signals
```typescript
export class MyComponent {
  private readonly rbacService = inject(RbacService);
  
  // Signals are automatically tracked in template
  canEdit = computed(() => this.rbacService.has('edit_attendance'));
}
```

```html
<button *ngIf="canEdit()">Edit</button>
```

---

## Error Handling Pattern

```typescript
export class MyComponent {
  private readonly studentService = inject(StudentService);
  loading = signal(false);
  error = signal<string | null>(null);

  loadStudents() {
    this.loading.set(true);
    this.error.set(null);
    
    this.studentService.getAll().subscribe({
      next: (data) => {
        console.log('Students loaded:', data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to load students');
        this.loading.set(false);
      }
    });
  }
}
```

```html
<div *ngIf="loading()">Loading...</div>
<div *ngIf="error()" class="error-message">{{ error() }}</div>
```

---

## Next Steps

### Phase 1: Complete Core Components (1-2 days)
- [ ] Home page with role-based redirects
- [ ] Login flow complete
- [ ] Dashboard navigation working

### Phase 2: Attendance System (1 day)
- [ ] Mark attendance page
- [ ] Update attendance page
- [ ] Attendance reports

### Phase 3: Academic Module (2 days)
- [ ] Test result entry
- [ ] Exam result entry
- [ ] Result reports

### Phase 4: Fee Management (1 day)
- [ ] Fee records display
- [ ] Payment tracking
- [ ] Fee reports

### Phase 5: Student Management (1 day)
- [ ] Student list management
- [ ] Student profiles
- [ ] Student search

### Phase 6: Backend APIs (3-5 days)
- [ ] Setup Node.js/Express
- [ ] MongoDB models
- [ ] JWT authentication
- [ ] All endpoints
- [ ] Input validation

### Phase 7: Testing & Deployment (1-2 days)
- [ ] Unit tests
- [ ] E2E tests
- [ ] Production build
- [ ] Deployment

---

## Development Tips

### 1. Use Environment Variables
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3001/api',
};
```

### 2. Consistent API Response Format
```typescript
{
  success: boolean;
  data: T;
  message?: string;
  error?: { code: string; details: string };
}
```

### 3. Always Use Services for API Calls
Never make HTTP calls directly in components. Always use services.

### 4. Type Everything
Use TypeScript interfaces for all data structures.

### 5. Handle Loading & Error States
Always show loading spinner and error messages to users.

### 6. Unsubscribe to Prevent Memory Leaks
```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.data$.pipe(
    takeUntil(this.destroy$)
  ).subscribe(...);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

---

## Common Issues & Solutions

### Issue: Routes not working after role change
**Solution:** The app requires a page refresh or manual navigation to apply new routes based on new role.

### Issue: Token expired mid-session
**Solution:** AuthService auto-refreshes 1 minute before expiry. If still experiencing issues, check backend token expiry times.

### Issue: CORS errors
**Solution:** Ensure backend has CORS enabled and includes your frontend URL:
```javascript
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

### Issue: Permissions not updating
**Solution:** Permissions are cached. Call `authService.loadPermissions()` after role updates.

---

## Resources

- [Angular 21 Docs](https://angular.io)
- [Angular Material](https://material.angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated:** May 2026
**Version:** 1.0
**Status:** In Development
