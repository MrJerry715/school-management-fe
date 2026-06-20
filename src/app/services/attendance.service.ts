import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AttendanceRecord } from '../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/attendance`;

  private attendanceSubject = new BehaviorSubject<AttendanceRecord[]>([]);
  attendance$ = this.attendanceSubject.asObservable();

  markAttendance(classId: string, date: Date, records: any[]): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/mark`, {
      classId,
      date,
      records,
    });
  }

  getByClass(classId: string, startDate?: Date, endDate?: Date): Observable<AttendanceRecord[]> {
    let params = new HttpParams().set('classId', classId);
    if (startDate) params = params.set('startDate', startDate.toISOString());
    if (endDate) params = params.set('endDate', endDate.toISOString());
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}`, { params });
  }

  getByStudent(studentId: string, startDate?: Date, endDate?: Date): Observable<AttendanceRecord[]> {
    let params = new HttpParams().set('studentId', studentId);
    if (startDate) params = params.set('startDate', startDate.toISOString());
    if (endDate) params = params.set('endDate', endDate.toISOString());
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/student`, { params });
  }

  updateAttendance(id: string, status: string, remarks?: string): Observable<AttendanceRecord> {
    return this.http.put<AttendanceRecord>(`${this.apiUrl}/${id}`, { status, remarks });
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getAttendanceReport(studentId: string): Observable<{
    totalDays: number;
    presentDays: number;
    absentDays: number;
    leaveDays: number;
    percentage: number;
  }> {
    return this.http.get<any>(`${this.apiUrl}/report/${studentId}`);
  }
}
