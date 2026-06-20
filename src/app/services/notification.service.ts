import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly notifications = signal<Notification[]>([]);
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private unreadCount = signal(0);
  unreadCount$ = this.unreadCount;

  add(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
    const notification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      timestamp: new Date(),
      read: false,
    };

    const current = this.notifications();
    this.notifications.set([notification, ...current]);
    this.notificationsSubject.next(this.notifications());
    this.unreadCount.set(this.unreadCount() + 1);

    // Auto remove after 5 seconds
    setTimeout(() => this.remove(notification.id), 5000);
  }

  remove(id: string): void {
    const current = this.notifications().filter((n) => n.id !== id);
    this.notifications.set(current);
    this.notificationsSubject.next(current);
  }

  markAsRead(id: string): void {
    const current = this.notifications();
    const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n));
    this.notifications.set(updated);
    this.notificationsSubject.next(updated);
    this.unreadCount.set(this.unreadCount() - 1);
  }

  clearAll(): void {
    this.notifications.set([]);
    this.notificationsSubject.next([]);
    this.unreadCount.set(0);
  }

  getUnread(): Notification[] {
    return this.notifications().filter((n) => !n.read);
  }
}
