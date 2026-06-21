import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExamResult } from '../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class ExamService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/exam-results`;

  private examResultsSubject = new BehaviorSubject<ExamResult[]>([]);
  examResults$ = this.examResultsSubject.asObservable();

  getAll(page?: number, limit?: number): Observable<{ data: ExamResult[]; total: number }> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (limit) params = params.set('limit', limit);
    return this.http.get<{ data: ExamResult[]; total: number }>(`${this.apiUrl}`, { params });
  }

  getById(id: string): Observable<ExamResult> {
    return this.http.get<ExamResult>(`${this.apiUrl}/${id}`);
  }

  getByStudent(studentId: string): Observable<ExamResult[]> {
    return this.http.get<ExamResult[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getByClass(classId: string): Observable<ExamResult[]> {
    return this.http.get<ExamResult[]>(`${this.apiUrl}/class/${classId}`);
  }

  create(data: Partial<ExamResult>): Observable<ExamResult> {
    return this.http.post<ExamResult>(`${this.apiUrl}`, data);
  }

  bulkCreate(records: any[]): Observable<{ message: string; count: number }> {
    return this.http.post<{ message: string; count: number }>(`${this.apiUrl}/bulk`, { records });
  }

  update(id: string, data: Partial<ExamResult>): Observable<ExamResult> {
    return this.http.put<ExamResult>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getClassPerformance(classId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/class/${classId}/performance`);
  }
}
