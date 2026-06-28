import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddEditClassDialogComponent } from '../dialogs/add-edit-class-dialog/add-edit-class-dialog.component';
import { AdmissionFormComponent } from '../../admission-form.component/admission-form.component';

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
  imports: [
    CommonModule,
    FormsModule,
    AddEditClassDialogComponent,
    AdmissionFormComponent
  ],
  templateUrl: './classes.component.html',
})
export class ClassesComponent {

  searchQuery = '';
  selectedGrade = '';
  selectedTeacher = '';

  showClassDialog = false;
  showAdmissionDialog = false;

  classDialogMode: 'add' | 'edit' = 'add';

  editingClass: SchoolClass | null = null;
  selectedClass: SchoolClass | null = null;

  classForm = {
    id: null as number | null,
    grade: '',
    section: '',
    teacher: '',
    room: '',
    students: 0
  };

  classList: SchoolClass[] = [
    {
      id: 1,
      grade: '10th Grade',
      section: 'A',
      teacher: 'Ms. Maria',
      room: 'A1',
      students: 32
    },
    {
      id: 2,
      grade: '5th Grade',
      section: 'B',
      teacher: 'Mr. Ali',
      room: 'B1',
      students: 30
    }
  ];

  get grades() {
    return [...new Set(this.classList.map(x => x.grade))];
  }

  get teachers() {
    return [...new Set(this.classList.map(x => x.teacher))];
  }

  get filteredClasses() {
    return this.classList.filter(item => {

      const search =
        !this.searchQuery ||
        item.grade.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.section.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.teacher.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.room.toLowerCase().includes(this.searchQuery.toLowerCase());

      const grade =
        !this.selectedGrade ||
        item.grade === this.selectedGrade;

      const teacher =
        !this.selectedTeacher ||
        item.teacher === this.selectedTeacher;

      return search && grade && teacher;
    });
  }

  addNewClass() {

    this.classDialogMode = 'add';

    this.classForm = {
      id: null,
      grade: '',
      section: '',
      teacher: '',
      room: '',
      students: 0
    };

    this.showClassDialog = true;
  }

  openEditClassDialog(item: SchoolClass) {

    this.classDialogMode = 'edit';

    this.classForm = { ...item };

    this.showClassDialog = true;
  }

  closeClassDialog() {
    this.showClassDialog = false;
  }

  saveClass(data: any) {

    if (this.classDialogMode === 'add') {

      const id = Math.max(...this.classList.map(x => x.id), 0) + 1;

      this.classList.push({
        id,
        ...data
      });

    } else {

      this.classList = this.classList.map(item =>
        item.id === data.id ? data : item
      );
    }

    this.closeClassDialog();
  }

  deleteClass(item: SchoolClass) {

    if (confirm('Delete this class?')) {

      this.classList = this.classList.filter(x => x.id !== item.id);

    }
  }

  resetClassFilters() {
    this.searchQuery = '';
    this.selectedGrade = '';
    this.selectedTeacher = '';
  }

  openAdmissionForm(classItem: SchoolClass) {
    this.selectedClass = classItem;
    this.showAdmissionDialog = true;
  }

  closeAdmissionForm() {
    this.showAdmissionDialog = false;
  }

  viewStudents(classItem: SchoolClass) {
    console.log(classItem);
  }

}