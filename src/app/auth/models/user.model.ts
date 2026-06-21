export type UserRole = 'admin' | 'teacher' | 'parent' | 'student';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileImage?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  data: {
    id: string;
    username: string;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
    phone?: string;
    profileImage?: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  rollNumber: string;
  classId: string;
  className: string;
  parentId: string;
  dateOfBirth?: Date;
  address?: string;
  phone?: string;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  qualification: string;
  classIds: string[];
  subjectIds: string[];
  joinDate?: Date;
  salary?: number;
}

export interface ParentProfile {
  id: string;
  userId: string;
  occupation?: string;
  childrenIds: string[];
}

export interface ClassModel {
  id: string;
  name: string;
  classTeacherId: string;
  classTeacherName?: string;
  section?: string;
  strength?: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  date: Date;
  status: 'present' | 'absent' | 'leave';
  remarks?: string;
  markedBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TestResult {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  testName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade?: string;
  testDate: Date;
  createdAt?: Date;
}

export interface ExamResult {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  examName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  grade?: string;
  examDate: Date;
  createdAt?: Date;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  parentId: string;
  month: string;
  year: number;
  amount: number;
  paidAmount: number;
  pendingAmount: number;
  status: 'paid' | 'unpaid' | 'partial';
  dueDate: Date;
  paidDate?: Date;
  remarks?: string;
  createdAt?: Date;
}

export interface StudentRemark {
  id: string;
  studentId: string;
  teacherId: string;
  teacherName: string;
  comment: string;
  date: Date;
  type: 'behavior' | 'academic' | 'health' | 'general';
  createdAt?: Date;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  reportUrl: string;
  uploadedBy: string;
  uploadDate: Date;
  remarks?: string;
  createdAt?: Date;
}
