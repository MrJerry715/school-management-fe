import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { StudentProfile, AttendanceRecord, TestResult, ExamResult, FeeRecord } from '../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/students`;

  private studentsSubject = new BehaviorSubject<StudentProfile[]>([]);
  students$ = this.studentsSubject.asObservable();

  getAll(page?: number, limit?: number): Observable<{ data: StudentProfile[]; total: number }> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (limit) params = params.set('limit', limit);
    return this.http.get<{ data: StudentProfile[]; total: number }>(`${this.apiUrl}`, { params });
  }

  getById(id: string): Observable<StudentProfile> {
    return this.http.get<StudentProfile>(`${this.apiUrl}/${id}`);
  }

  getByClass(classId: string): Observable<StudentProfile[]> {
    return this.http.get<StudentProfile[]>(`${this.apiUrl}/class/${classId}`);
  }

  getByParent(parentId: string): Observable<StudentProfile[]> {
    return this.http.get<StudentProfile[]>(`${this.apiUrl}/parent/${parentId}`);
  }

  create(data: Partial<StudentProfile>): Observable<StudentProfile> {
    return this.http.post<StudentProfile>(`${this.apiUrl}`, data);
  }

  update(id: string, data: Partial<StudentProfile>): Observable<StudentProfile> {
    return this.http.put<StudentProfile>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  search(query: string): Observable<StudentProfile[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<StudentProfile[]>(`${this.apiUrl}/search`, { params });
  }

  getAttendanceHistory(studentId: string): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/${studentId}/attendance`);
  }

  getTestResults(studentId: string): Observable<TestResult[]> {
    return this.http.get<TestResult[]>(`${this.apiUrl}/${studentId}/test-results`);
  }

  getExamResults(studentId: string): Observable<ExamResult[]> {
    return this.http.get<ExamResult[]>(`${this.apiUrl}/${studentId}/exam-results`);
  }

  getFeeRecords(studentId: string): Observable<FeeRecord[]> {
    return this.http.get<FeeRecord[]>(`${this.apiUrl}/${studentId}/fees`);
  }
}
