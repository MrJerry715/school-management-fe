import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { FeeRecord } from '../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class FeeService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/fees`;

  private feeRecordsSubject = new BehaviorSubject<FeeRecord[]>([]);
  feeRecords$ = this.feeRecordsSubject.asObservable();

  getAll(page?: number, limit?: number): Observable<{ data: FeeRecord[]; total: number }> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (limit) params = params.set('limit', limit);
    return this.http.get<{ data: FeeRecord[]; total: number }>(`${this.apiUrl}`, { params });
  }

  getById(id: string): Observable<FeeRecord> {
    return this.http.get<FeeRecord>(`${this.apiUrl}/${id}`);
  }

  getByStudent(studentId: string): Observable<FeeRecord[]> {
    return this.http.get<FeeRecord[]>(`${this.apiUrl}/student/${studentId}`);
  }

  getByParent(parentId: string): Observable<FeeRecord[]> {
    return this.http.get<FeeRecord[]>(`${this.apiUrl}/parent/${parentId}`);
  }

  getByClass(classId: string): Observable<FeeRecord[]> {
    return this.http.get<FeeRecord[]>(`${this.apiUrl}/class/${classId}`);
  }

  create(data: Partial<FeeRecord>): Observable<FeeRecord> {
    return this.http.post<FeeRecord>(`${this.apiUrl}`, data);
  }

  update(id: string, data: Partial<FeeRecord>): Observable<FeeRecord> {
    return this.http.put<FeeRecord>(`${this.apiUrl}/${id}`, data);
  }

  recordPayment(id: string, amount: number, paymentDate?: Date): Observable<FeeRecord> {
    return this.http.put<FeeRecord>(`${this.apiUrl}/${id}/payment`, { amount, paymentDate });
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  getFeeReport(parentId: string): Observable<{
    totalFee: number;
    totalPaid: number;
    totalPending: number;
    records: FeeRecord[];
  }> {
    return this.http.get<any>(`${this.apiUrl}/report/${parentId}`);
  }

  getDueAmount(studentId: string): Observable<{ dueAmount: number; lastPaymentDate?: Date }> {
    return this.http.get<any>(`${this.apiUrl}/due/${studentId}`);
  }
}
