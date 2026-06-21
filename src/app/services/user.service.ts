import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../auth/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/users`;

  getAll(page?: number, limit?: number, role?: string): Observable<{ data: User[]; total: number }> {
    let params = new HttpParams();
    if (page) params = params.set('page', page);
    if (limit) params = params.set('limit', limit);
    if (role) params = params.set('role', role);
    return this.http.get<{ data: User[]; total: number }>(`${this.apiUrl}`, { params });
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  create(data: Partial<User> & { password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, data);
  }

  update(id: string, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  changePassword(id: string, oldPassword: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/${id}/change-password`, {
      oldPassword,
      newPassword,
    });
  }

  toggleActive(id: string): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/toggle-active`, {});
  }
}
