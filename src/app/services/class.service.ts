import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClassModel, StudentProfile } from '../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/classes`;

  private classesSubject = new BehaviorSubject<ClassModel[]>([]);
  classes$ = this.classesSubject.asObservable();

  getAll(page?: number, limit?: number): Observable<{ data: ClassModel[]; total: number }> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (limit) params = params.set('limit', limit);
    return this.http.get<{ data: ClassModel[]; total: number }>(`${this.apiUrl}`, { params });
  }

  getById(id: string): Observable<ClassModel> {
    return this.http.get<ClassModel>(`${this.apiUrl}/${id}`);
  }

  getByTeacher(teacherId: string): Observable<ClassModel[]> {
    return this.http.get<ClassModel[]>(`${this.apiUrl}/teacher/${teacherId}`);
  }

  getStudentsInClass(classId: string): Observable<StudentProfile[]> {
    return this.http.get<StudentProfile[]>(`${this.apiUrl}/${classId}/students`);
  }

  create(data: Partial<ClassModel>): Observable<ClassModel> {
    return this.http.post<ClassModel>(`${this.apiUrl}`, data);
  }

  update(id: string, data: Partial<ClassModel>): Observable<ClassModel> {
    return this.http.put<ClassModel>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
