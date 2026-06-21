import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StudentProfile, FeeRecord, TestResult, ExamResult, AttendanceRecord, StudentRemark, StudentProgress } from '../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class ParentService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/parents`;

  getChildren(parentId: string): Observable<StudentProfile[]> {
    return this.http.get<StudentProfile[]>(`${this.apiUrl}/${parentId}/children`);
  }

  getChildFeeRecords(parentId: string, childId: string): Observable<FeeRecord[]> {
    return this.http.get<FeeRecord[]>(`${this.apiUrl}/${parentId}/children/${childId}/fees`);
  }

  getChildAttendance(parentId: string, childId: string): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/${parentId}/children/${childId}/attendance`);
  }

  getChildTestResults(parentId: string, childId: string): Observable<TestResult[]> {
    return this.http.get<TestResult[]>(`${this.apiUrl}/${parentId}/children/${childId}/test-results`);
  }

  getChildExamResults(parentId: string, childId: string): Observable<ExamResult[]> {
    return this.http.get<ExamResult[]>(`${this.apiUrl}/${parentId}/children/${childId}/exam-results`);
  }

  getChildRemarks(parentId: string, childId: string): Observable<StudentRemark[]> {
    return this.http.get<StudentRemark[]>(`${this.apiUrl}/${parentId}/children/${childId}/remarks`);
  }

  getChildProgress(parentId: string, childId: string): Observable<StudentProgress[]> {
    return this.http.get<StudentProgress[]>(`${this.apiUrl}/${parentId}/children/${childId}/progress`);
  }
}
