import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SchoolClass {
  id: number;
  grade: string;
  section: string;
  teacher: string;
  room: string;
  students: number;
}

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classes.component.html',
})
export class ClassesComponent {
  searchQuery = '';
  selectedGrade = '';
  selectedTeacher = '';

  showClassDialog = false;
  classDialogMode: 'add' | 'edit' = 'add';

  editingClass: SchoolClass | null = null;

  classForm: Omit<SchoolClass, 'id'> & { id: number | null } = {
    id: null,
    grade: '',
    section: '',
    teacher: '',
    room: '',
    students: 0,
  };

  classList: SchoolClass[] = [
    {
      id: 1,
      grade: '10th Grade',
      section: 'A',
      teacher: 'Ms. Maria',
      room: 'A1',
      students: 32,
    },
    {
      id: 2,
      grade: '5th Grade',
      section: 'B',
      teacher: 'Mr. Ali',
      room: 'B1',
      students: 30,
    },
    {
      id: 3,
      grade: '8th Grade',
      section: 'C',
      teacher: 'Mrs. Sara',
      room: 'C2',
      students: 28,
    },
    {
      id: 4,
      grade: '10th Grade',
      section: 'A',
      teacher: 'Mr. Shah',
      room: 'D1',
      students: 26,
    },
  ];

  get grades(): string[] {
    return [...new Set(this.classList.map((item) => item.grade))].sort();
  }

  get teachers(): string[] {
    return [...new Set(this.classList.map((item) => item.teacher))].sort();
  }

  get filteredClasses(): SchoolClass[] {
    return this.classList.filter((item) => {
      const matchesQuery = this.searchQuery
        ? item.grade.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.section.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.teacher.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.room.toLowerCase().includes(this.searchQuery.toLowerCase())
        : true;

      const matchesGrade = this.selectedGrade
        ? item.grade === this.selectedGrade
        : true;

      const matchesTeacher = this.selectedTeacher
        ? item.teacher === this.selectedTeacher
        : true;

      return matchesQuery && matchesGrade && matchesTeacher;
    });
  }

  resetClassFilters(): void {
    this.searchQuery = '';
    this.selectedGrade = '';
    this.selectedTeacher = '';
  }

  addNewClass(): void {
    this.classDialogMode = 'add';
    this.editingClass = null;
    this.resetClassForm();
    this.showClassDialog = true;
  }

  openEditClassDialog(classItem: SchoolClass): void {
    this.classDialogMode = 'edit';
    this.editingClass = classItem;
    this.classForm = { ...classItem };
    this.showClassDialog = true;
  }

  closeClassDialog(): void {
    this.showClassDialog = false;
    this.resetClassForm();
  }

  resetClassForm(): void {
    this.classForm = {
      id: null,
      grade: '',
      section: '',
      teacher: '',
      room: '',
      students: 0,
    };
  }

  saveClass(): void {
    if (
      !this.classForm.grade ||
      !this.classForm.section ||
      !this.classForm.teacher ||
      !this.classForm.room
    ) {
      window.alert('Please complete all required class fields.');
      return;
    }

    if (this.classDialogMode === 'add') {
      const nextId =
        Math.max(...this.classList.map((item) => item.id), 0) + 1;

      const newClass: SchoolClass = {
        id: nextId,
        grade: this.classForm.grade,
        section: this.classForm.section,
        teacher: this.classForm.teacher,
        room: this.classForm.room,
        students: this.classForm.students,
      };

      this.classList = [...this.classList, newClass];
    } else if (this.editingClass) {
      this.classList = this.classList.map((item) =>
        item.id === this.editingClass!.id
          ? {
              id: item.id,
              grade: this.classForm.grade,
              section: this.classForm.section,
              teacher: this.classForm.teacher,
              room: this.classForm.room,
              students: this.classForm.students,
            }
          : item
      );
    }

    this.closeClassDialog();
  }

  deleteClass(classItem: SchoolClass): void {
    const confirmed = window.confirm(
      `Delete ${classItem.grade} Section ${classItem.section}?`
    );

    if (confirmed) {
      this.classList = this.classList.filter(
        (item) => item.id !== classItem.id
      );
    }
  }
} 