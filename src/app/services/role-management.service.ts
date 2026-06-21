import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface RolePermission {
  id: string;
  role: 'admin' | 'teacher' | 'parent' | 'student';
  permissions: string[];
  description: string;
}

export interface TeacherAssignment {
  teacherId: string;
  teacherName: string;
  classIds: string[];
  subjects: string[];
  status: 'active' | 'inactive';
  email: string;
  phone?: string;
}

export interface ParentChildMapping {
  parentId: string;
  parentName: string;
  childrenIds: string[];
  childrenNames: string[];
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class RoleManagementService {
  private rolePermissions: RolePermission[] = [
    {
      id: 'role-admin',
      role: 'admin',
      permissions: [
        'view_all_users',
        'create_user',
        'delete_user',
        'assign_roles',
        'manage_teachers',
        'manage_parents',
        'manage_students',
        'view_all_data',
        'generate_reports',
      ],
      description: 'System Administrator - Full Access',
    },
    {
      id: 'role-teacher',
      role: 'teacher',
      permissions: [
        'view_assigned_students',
        'mark_attendance',
        'enter_test_results',
        'view_assigned_classes',
        'view_my_schedule',
        'communication_students_parents',
      ],
      description: 'Teacher - Manage Assigned Classes',
    },
    {
      id: 'role-parent',
      role: 'parent',
      permissions: [
        'view_child_attendance',
        'view_child_results',
        'view_child_fees',
        'communication_teacher',
      ],
      description: 'Parent - View Child Information',
    },
    {
      id: 'role-student',
      role: 'student',
      permissions: [
        'view_own_attendance',
        'view_own_results',
        'view_own_fees',
      ],
      description: 'Student - View Own Information',
    },
  ];

  private teacherAssignments$ = new BehaviorSubject<TeacherAssignment[]>([
    {
      teacherId: 't1',
      teacherName: 'Ali Ahmed Khan',
      classIds: ['class-1', 'class-2'],
      subjects: ['Mathematics', 'Physics'],
      status: 'active',
      email: 'ali.khan@school.com',
      phone: '+92-300-1234567',
    },
    {
      teacherId: 't2',
      teacherName: 'Fatima Hassan',
      classIds: ['class-3'],
      subjects: ['English', 'Literature'],
      status: 'active',
      email: 'fatima.hassan@school.com',
      phone: '+92-300-7654321',
    },
    {
      teacherId: 't3',
      teacherName: 'Muhammad Ibrahim',
      classIds: ['class-1'],
      subjects: ['Islamic Studies'],
      status: 'inactive',
      email: 'm.ibrahim@school.com',
      phone: '+92-300-5555555',
    },
  ]);

  private parentChildMappings$ = new BehaviorSubject<ParentChildMapping[]>([
    {
      parentId: 'p1',
      parentName: 'Ahmed Hassan',
      childrenIds: ['s1', 's2'],
      childrenNames: ['Ali Hassan', 'Zainab Hassan'],
      email: 'ahmed.hassan@email.com',
    },
    {
      parentId: 'p2',
      parentName: 'Ayesha Khan',
      childrenIds: ['s3'],
      childrenNames: ['Sara Khan'],
      email: 'ayesha.khan@email.com',
    },
  ]);

  getRolePermissions(): Observable<RolePermission[]> {
    return new Observable((observer) => {
      observer.next(this.rolePermissions);
      observer.complete();
    });
  }

  getRolePermissionsByRole(role: string): RolePermission | undefined {
    return this.rolePermissions.find((rp) => rp.role === role);
  }

  getTeacherAssignments(): Observable<TeacherAssignment[]> {
    return this.teacherAssignments$.asObservable();
  }

  updateTeacherAssignment(assignment: TeacherAssignment): void {
    const current = this.teacherAssignments$.value;
    const index = current.findIndex((a) => a.teacherId === assignment.teacherId);
    if (index !== -1) {
      current[index] = assignment;
      this.teacherAssignments$.next([...current]);
    }
  }

  addTeacherAssignment(assignment: TeacherAssignment): void {
    const current = this.teacherAssignments$.value;
    this.teacherAssignments$.next([...current, assignment]);
  }

  getParentChildMappings(): Observable<ParentChildMapping[]> {
    return this.parentChildMappings$.asObservable();
  }

  getChildrenByParent(parentId: string): string[] {
    const mapping = this.parentChildMappings$.value.find((m) => m.parentId === parentId);
    return mapping?.childrenIds || [];
  }

  getActiveTeachersCount(): number {
    return this.teacherAssignments$.value.filter((t) => t.status === 'active').length;
  }

  getInactiveTeachersCount(): number {
    return this.teacherAssignments$.value.filter((t) => t.status === 'inactive').length;
  }

  updateParentChildMapping(mapping: ParentChildMapping): void {
    const current = this.parentChildMappings$.value;
    const index = current.findIndex((m) => m.parentId === mapping.parentId);
    if (index !== -1) {
      current[index] = mapping;
      this.parentChildMappings$.next([...current]);
    }
  }

  addParentChildMapping(mapping: ParentChildMapping): void {
    const current = this.parentChildMappings$.value;
    this.parentChildMappings$.next([...current, mapping]);
  }
}
