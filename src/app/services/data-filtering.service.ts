import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RoleManagementService } from './role-management.service';

export interface DataFilter {
  role: string;
  userId: string;
  assignedClassIds?: string[];
  childrenIds?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DataFilteringService {
  private authService = inject(AuthService);
  private roleService = inject(RoleManagementService);

  /**
   * Get the data filter for the current user based on their role
   */
  getCurrentUserFilter(): DataFilter {
    const user = this.authService.currentUser;
    if (!user) {
      return { role: 'none', userId: '' };
    }

    const filter: DataFilter = {
      role: user.role,
      userId: user.id,
    };

    if (user.role === 'teacher') {
      // Get assigned classes for this teacher
      this.roleService.getTeacherAssignments().subscribe({
        next: (assignments) => {
          const assignment = assignments.find((a) => a.teacherId === user.id);
          if (assignment) {
            filter.assignedClassIds = assignment.classIds;
          }
        },
      });
    }

    if (user.role === 'parent') {
      // Get children for this parent
      filter.childrenIds = this.roleService.getChildrenByParent(user.id);
    }

    return filter;
  }

  /**
   * Filter students based on current user's role
   */
  filterStudents(students: any[]): any[] {
    const user = this.authService.currentUser;
    if (!user) return [];

    if (user.role === 'admin') {
      // Admin sees all students
      return students;
    }

    if (user.role === 'teacher') {
      // Teacher sees students in their assigned classes
      const filter = this.getCurrentUserFilter();
      return students.filter((student) =>
        filter.assignedClassIds?.includes(student.classId)
      );
    }

    if (user.role === 'parent') {
      // Parent sees only their children
      const filter = this.getCurrentUserFilter();
      return students.filter((student) =>
        filter.childrenIds?.includes(student.id)
      );
    }

    if (user.role === 'student') {
      // Student sees only themselves
      return students.filter((student) => student.id === user.id);
    }

    return [];
  }

  /**
   * Filter attendance records based on current user's role
   */
  filterAttendance(records: any[]): any[] {
    const user = this.authService.currentUser;
    if (!user) return [];

    if (user.role === 'admin') {
      return records;
    }

    if (user.role === 'teacher') {
      const filter = this.getCurrentUserFilter();
      return records.filter((record) =>
        filter.assignedClassIds?.includes(record.classId)
      );
    }

    if (user.role === 'parent') {
      const filter = this.getCurrentUserFilter();
      return records.filter((record) =>
        filter.childrenIds?.includes(record.studentId)
      );
    }

    if (user.role === 'student') {
      return records.filter((record) => record.studentId === user.id);
    }

    return [];
  }

  /**
   * Filter test results based on current user's role
   */
  filterTestResults(results: any[]): any[] {
    const user = this.authService.currentUser;
    if (!user) return [];

    if (user.role === 'admin') {
      return results;
    }

    if (user.role === 'teacher') {
      const filter = this.getCurrentUserFilter();
      return results.filter((result) =>
        filter.assignedClassIds?.includes(result.classId)
      );
    }

    if (user.role === 'parent') {
      const filter = this.getCurrentUserFilter();
      return results.filter((result) =>
        filter.childrenIds?.includes(result.studentId)
      );
    }

    if (user.role === 'student') {
      return results.filter((result) => result.studentId === user.id);
    }

    return [];
  }

  /**
   * Filter fee records based on current user's role
   */
  filterFeeRecords(records: any[]): any[] {
    const user = this.authService.currentUser;
    if (!user) return [];

    if (user.role === 'admin') {
      return records;
    }

    if (user.role === 'parent') {
      const filter = this.getCurrentUserFilter();
      return records.filter((record) =>
        filter.childrenIds?.includes(record.studentId)
      );
    }

    if (user.role === 'student') {
      return records.filter((record) => record.studentId === user.id);
    }

    return [];
  }

  /**
   * Check if user has permission
   */
  hasPermission(permission: string): boolean {
    const user = this.authService.currentUser;
    if (!user) return false;

    const rolePermission = this.roleService.getRolePermissionsByRole(user.role);
    return rolePermission?.permissions.includes(permission) || false;
  }

  /**
   * Check if user can access a specific resource
   */
  canAccessStudent(studentId: string, studentClassId?: string): boolean {
    const user = this.authService.currentUser;
    if (!user) return false;

    if (user.role === 'admin') return true;

    if (user.role === 'teacher' && studentClassId) {
      const filter = this.getCurrentUserFilter();
      return filter.assignedClassIds?.includes(studentClassId) || false;
    }

    if (user.role === 'parent') {
      const filter = this.getCurrentUserFilter();
      return filter.childrenIds?.includes(studentId) || false;
    }

    if (user.role === 'student') {
      return user.id === studentId;
    }

    return false;
  }
}
