import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { TestResult } from '../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class TestResultService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/test-results`;

  private testResultsSubject = new BehaviorSubject<TestResult[]>([]);
  testResults$ = this.testResultsSubject.asObservable();

  getAll(page?: number, limit?: number): Observable<{ data: TestResult[]; total: number }> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (limit) params = params.set('limit', limit);
    return this.http.get<{ data: TestResult[]; total: number }>(`${this.apiUrl}`, { params });
  }

  getById(id: string): Observable<TestResult> {
    return this.http.get<TestResult>(`${this.apiUrl}/${id}`);
  }

  getByStudent(studentId: string): Observable<TestResult[]> {
    return this.http.get<TestResult[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getByClass(classId: string): Observable<TestResult[]> {
    return this.http.get<TestResult[]>(`${this.apiUrl}/class/${classId}`);
  }

  create(data: Partial<TestResult>): Observable<TestResult> {
    return this.http.post<TestResult>(`${this.apiUrl}`, data);
  }

  bulkCreate(records: any[]): Observable<{ message: string; count: number }> {
    return this.http.post<{ message: string; count: number }>(`${this.apiUrl}/bulk`, { records });
  }

  update(id: string, data: Partial<TestResult>): Observable<TestResult> {
    return this.http.put<TestResult>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getClassPerformance(classId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/class/${classId}/performance`);
  }
}
