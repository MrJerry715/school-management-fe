import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  class: string;
  section: string;
  status: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
})
export class StudentsComponent {

  filterText = '';
  selectedClass = '';
  selectedSection = '';
  selectedStatus = '';

  showStudentDialog = false;
  studentDialogMode: 'add' | 'edit' = 'add';

  editingStudent: Student | null = null;

  studentForm: Omit<Student, 'id'> & { id: number | null } = {
    id: null,
    name: '',
    class: '',
    section: '',
    status: 'Active',
  };

  overview = [
    { label: 'Total Students', value: '1,256' },
    { label: 'New Admissions', value: '48' },
    { label: 'Pending Fees', value: '37' },
    { label: 'Scholarship Students', value: '76' },
  ];

  students: Student[] = [
    {
      id: 1,
      name: 'Aisha Khan',
      class: '8-A',
      section: 'A',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Rohan Patel',
      class: '10-B',
      section: 'B',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Sara Ali',
      class: '7-C',
      section: 'C',
      status: 'Pending',
    },
    {
      id: 4,
      name: 'Imran Sheikh',
      class: '9-A',
      section: 'A',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Meera Sharma',
      class: '8-A',
      section: 'A',
      status: 'Active',
    },
  ];

  get classes(): string[] {
    return [...new Set(this.students.map(student => student.class))].sort();
  }

  get sections(): string[] {
    return [...new Set(this.students.map(student => student.section))].sort();
  }

  get statuses(): string[] {
    return [...new Set(this.students.map(student => student.status))].sort();
  }

  get filteredStudents(): Student[] {
    return this.students.filter(student => {

      const matchesText = this.filterText
        ? student.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
          student.class.toLowerCase().includes(this.filterText.toLowerCase()) ||
          student.section.toLowerCase().includes(this.filterText.toLowerCase())
        : true;

      const matchesClass = this.selectedClass
        ? student.class === this.selectedClass
        : true;

      const matchesSection = this.selectedSection
        ? student.section === this.selectedSection
        : true;

      const matchesStatus = this.selectedStatus
        ? student.status === this.selectedStatus
        : true;

      return matchesText &&
             matchesClass &&
             matchesSection &&
             matchesStatus;
    });
  }

  resetFilters(): void {
    this.filterText = '';
    this.selectedClass = '';
    this.selectedSection = '';
    this.selectedStatus = '';
  }

  openAddStudentDialog(): void {
    this.studentDialogMode = 'add';
    this.editingStudent = null;
    this.resetStudentForm();
    this.showStudentDialog = true;
  }

  openEditStudentDialog(student: Student): void {
    this.studentDialogMode = 'edit';
    this.editingStudent = student;
    this.studentForm = { ...student };
    this.showStudentDialog = true;
  }

  closeStudentDialog(): void {
    this.showStudentDialog = false;
    this.resetStudentForm();
  }

  resetStudentForm(): void {
    this.studentForm = {
      id: null,
      name: '',
      class: '',
      section: '',
      status: 'Active',
    };
  }

  saveStudent(): void {

    if (
      !this.studentForm.name ||
      !this.studentForm.class ||
      !this.studentForm.section
    ) {
      window.alert('Please complete all required student fields.');
      return;
    }

    if (this.studentDialogMode === 'add') {

      const nextId =
        Math.max(...this.students.map(student => student.id), 0) + 1;

      const newStudent: Student = {
        id: nextId,
        name: this.studentForm.name,
        class: this.studentForm.class,
        section: this.studentForm.section,
        status: this.studentForm.status,
      };

      this.students = [...this.students, newStudent];

    } else if (this.editingStudent) {

      this.students = this.students.map(student =>
        student.id === this.editingStudent!.id
          ? {
              id: student.id,
              name: this.studentForm.name,
              class: this.studentForm.class,
              section: this.studentForm.section,
              status: this.studentForm.status,
            }
          : student
      );
    }

    this.closeStudentDialog();
  }

  deleteStudent(student: Student): void {

    const confirmed = window.confirm(
      `Delete ${student.name} from the roster?`
    );

    if (confirmed) {
      this.students = this.students.filter(
        item => item.id !== student.id
      );
    }
  } 
}