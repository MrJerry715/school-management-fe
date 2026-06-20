import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { RoleManagementService, RolePermission, TeacherAssignment, ParentChildMapping } from '../../app/services/role-management.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
  ],
  templateUrl: './user-management.component.html',
  styles: [`
    .permission-table {
      width: 100%;
      border-collapse: collapse;
    }
    .permission-table th, .permission-table td {
      padding: 12px;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
    }
    .permission-table th {
      background-color: #f5f5f5;
      font-weight: 600;
    }
    .status-active { color: #4caf50; font-weight: 600; }
    .status-inactive { color: #f44336; font-weight: 600; }
  `],
})
export class UserManagementComponent implements OnInit {
  private roleService = inject(RoleManagementService);

  // Tabs
  activeTab = 0;

  // Role Permissions
  rolePermissions: RolePermission[] = [];
  displayedRoleColumns: string[] = ['role', 'description', 'permissions'];

  // Teachers
  teachers: TeacherAssignment[] = [];
  displayedTeacherColumns: string[] = ['name', 'status', 'classes', 'subjects', 'email', 'actions'];
  selectedTeacher: TeacherAssignment | null = null;
  editingTeacher: TeacherAssignment | null = null;
  availableClasses = ['Class 1A', 'Class 1B', 'Class 2A', 'Class 2B', 'Class 3A', 'Class 3B'];
  availableSubjects = ['Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Islamic Studies', 'Literature'];

  // Parent-Child Mapping
  parentChildMappings: ParentChildMapping[] = [];
  displayedParentColumns: string[] = ['parentName', 'children', 'email', 'actions'];
  selectedParent: ParentChildMapping | null = null;
  editingParent: ParentChildMapping | null = null;
  availableStudents = [
    { id: 's1', name: 'Ali Hassan' },
    { id: 's2', name: 'Zainab Hassan' },
    { id: 's3', name: 'Sara Khan' },
    { id: 's4', name: 'Omar Ahmed' },
    { id: 's5', name: 'Layla Khan' },
  ];

  // Stats
  activeTeachersCount = 0;
  inactiveTeachersCount = 0;

  ngOnInit() {
    this.loadRolePermissions();
    this.loadTeachers();
    this.loadParentChildMappings();
    this.updateStats();
  }

  loadRolePermissions() {
    this.roleService.getRolePermissions().subscribe((permissions) => {
      this.rolePermissions = permissions;
    });
  }

  loadTeachers() {
    this.roleService.getTeacherAssignments().subscribe((teachers) => {
      this.teachers = teachers;
      this.updateStats();
    });
  }

  loadParentChildMappings() {
    this.roleService.getParentChildMappings().subscribe((mappings) => {
      this.parentChildMappings = mappings;
    });
  }

  updateStats() {
    this.activeTeachersCount = this.roleService.getActiveTeachersCount();
    this.inactiveTeachersCount = this.roleService.getInactiveTeachersCount();
  }

  // Teacher Management
  editTeacher(teacher: TeacherAssignment) {
    this.editingTeacher = { ...teacher };
  }

  saveTeacher() {
    if (this.editingTeacher) {
      this.roleService.updateTeacherAssignment(this.editingTeacher);
      this.loadTeachers();
      this.editingTeacher = null;
    }
  }

  cancelEditTeacher() {
    this.editingTeacher = null;
  }

  toggleTeacherStatus(teacher: TeacherAssignment) {
    const updated = { ...teacher };
    updated.status = teacher.status === 'active' ? 'inactive' : 'active';
    this.roleService.updateTeacherAssignment(updated);
    this.loadTeachers();
  }

  getClassNames(classIds: string[]): string {
    return classIds
      .map((id) => this.availableClasses.find((c) => c === id) || id)
      .join(', ');
  }

  // Parent-Child Mapping
  editParent(parent: ParentChildMapping) {
    this.editingParent = { ...parent };
  }

  saveParent() {
    if (this.editingParent) {
      this.roleService.updateParentChildMapping(this.editingParent);
      this.loadParentChildMappings();
      this.editingParent = null;
    }
  }

  cancelEditParent() {
    this.editingParent = null;
  }

  getChildrenNames(childrenIds: string[]): string {
    return childrenIds
      .map(
        (id) =>
          this.availableStudents.find((s) => s.id === id)?.name || id
      )
      .join(', ');
  }

  cards = [
    {
      title: 'Students',
    },
    {
      title: 'Teachers',
    },
    {
      title: 'Staff',
    },
  ];
}
