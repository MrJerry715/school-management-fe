import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ClassForm {

  id: number | null;
  grade: string;
  section: string;
  teacher: string;
  room: string;
  students: number;

}

@Component({
  selector: 'app-add-edit-class-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-edit-class-dialog.component.html'
})
export class AddEditClassDialogComponent implements OnChanges {

  @Input() mode: 'add' | 'edit' = 'add';

  @Input() classData!: ClassForm;

  @Output() close = new EventEmitter<void>();

  @Output() save = new EventEmitter<ClassForm>();

  form: ClassForm = {
    id: null,
    grade: '',
    section: '',
    teacher: '',
    room: '',
    students: 0
  };

  ngOnChanges(changes: SimpleChanges) {

    if (changes['classData']) {

      this.form = {
        ...this.classData
      };

    }

  }

  onSave() {

    if (
      !this.form.grade ||
      !this.form.section ||
      !this.form.teacher ||
      !this.form.room
    ) {
      alert('Please fill all fields.');
      return;
    }

    this.save.emit(this.form);

  }

  onClose() {

    this.close.emit();

  }

}