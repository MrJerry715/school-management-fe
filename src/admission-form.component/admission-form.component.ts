import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admission-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './admission-form.component.html',
})
export class AdmissionFormComponent {

  form = {
    // Student Information
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    cnic: '',
    bloodGroup: '',

    // Parent Information
    fatherName: '',
    motherName: '',
    fatherPhone: '',
    motherPhone: '',
    email: '',

    // Address
    address: '',
    city: '',
    postalCode: ''
  };

  onSave() {

    // Simple Validation

    if (!this.form.firstName) {
      alert('Please enter First Name');
      return;
    }

    if (!this.form.lastName) {
      alert('Please enter Last Name');
      return;
    }

    if (!this.form.gender) {
      alert('Please select Gender');
      return;
    }

    console.log('Admission Form');

    console.log(this.form);

    alert('Student Admission Saved Successfully');

    this.resetForm();
  }

  onClose() {
    console.log('Dialog Closed');
  }

  resetForm() {

    this.form = {

      firstName: '',
      lastName: '',
      gender: '',
      dob: '',
      cnic: '',
      bloodGroup: '',

      fatherName: '',
      motherName: '',
      fatherPhone: '',
      motherPhone: '',
      email: '',

      address: '',
      city: '',
      postalCode: ''

    };

  }

}