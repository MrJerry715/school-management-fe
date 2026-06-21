import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TeacherProfile, ClassModel, StudentProfile } from '../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/teachers`;

  getProfile(teacherId: string): Observable<TeacherProfile> {
    return this.http.get<TeacherProfile>(`${this.apiUrl}/${teacherId}`);
  }

  getAssignedClasses(teacherId: string): Observable<ClassModel[]> {
    return this.http.get<ClassModel[]>(`${this.apiUrl}/${teacherId}/classes`);
  }

  getAssignedStudents(teacherId: string): Observable<StudentProfile[]> {
    return this.http.get<StudentProfile[]>(`${this.apiUrl}/${teacherId}/students`);
  }

  updateProfile(teacherId: string, data: Partial<TeacherProfile>): Observable<TeacherProfile> {
    return this.http.put<TeacherProfile>(`${this.apiUrl}/${teacherId}`, data);
  }
}
