// Backend API Documentation
// Base URL: http://localhost:3001/api

// ============== AUTHENTICATION ===============
// POST /auth/login
// Request: { username: string, password: string }
// Response: { success: true, data: { id, username, email, role, firstName, lastName, phone, profileImage, accessToken, refreshToken } }

// POST /auth/register
// Request: { username, email, password, role, firstName?, lastName? }
// Response: { success: true, data: { user } }

// POST /auth/refresh
// Request: { refreshToken: string }
// Response: { success: true, data: { accessToken, refreshToken, ... } }

// GET /auth/me/permissions
// Headers: { Authorization: 'Bearer token' }
// Response: { success: true, data: string[] }

// ============== USERS (ADMIN ONLY) ===============
// GET /users?page=1&limit=10&role=teacher
// Response: { data: User[], total: number }

// POST /users
// Request: { username, email, password, role, firstName?, lastName?, phone? }
// Response: User

// GET /users/:id
// Response: User

// PUT /users/:id
// Request: Partial<User>
// Response: User

// DELETE /users/:id
// Response: { message: string }

// POST /users/:id/change-password
// Request: { oldPassword, newPassword }
// Response: { message: string }

// PATCH /users/:id/toggle-active
// Response: User

// ============== STUDENTS ===============
// GET /students?page=1&limit=10
// Response: { data: StudentProfile[], total: number }

// POST /students
// Request: StudentProfile
// Response: StudentProfile

// GET /students/:id
// Response: StudentProfile

// PUT /students/:id
// Request: Partial<StudentProfile>
// Response: StudentProfile

// DELETE /students/:id
// Response: { message: string }

// GET /students/search?q=query
// Response: StudentProfile[]

// GET /students/class/:classId
// Response: StudentProfile[]

// GET /students/parent/:parentId
// Response: StudentProfile[]

// GET /students/:id/attendance
// Response: AttendanceRecord[]

// GET /students/:id/test-results
// Response: TestResult[]

// GET /students/:id/exam-results
// Response: ExamResult[]

// GET /students/:id/fees
// Response: FeeRecord[]

// ============== CLASSES ===============
// GET /classes?page=1&limit=10
// Response: { data: ClassModel[], total: number }

// POST /classes
// Request: Partial<ClassModel>
// Response: ClassModel

// GET /classes/:id
// Response: ClassModel

// PUT /classes/:id
// Request: Partial<ClassModel>
// Response: ClassModel

// DELETE /classes/:id
// Response: { message: string }

// GET /classes/:id/students
// Response: StudentProfile[]

// GET /classes/teacher/:teacherId
// Response: ClassModel[]

// ============== TEACHERS ===============
// GET /teachers/:id
// Response: TeacherProfile

// GET /teachers/:id/classes
// Response: ClassModel[]

// GET /teachers/:id/students
// Response: StudentProfile[]

// PUT /teachers/:id
// Request: Partial<TeacherProfile>
// Response: TeacherProfile

// ============== PARENTS ===============
// GET /parents/:id/children
// Response: StudentProfile[]

// GET /parents/:id/children/:childId/fees
// Response: FeeRecord[]

// GET /parents/:id/children/:childId/attendance
// Response: AttendanceRecord[]

// GET /parents/:id/children/:childId/test-results
// Response: TestResult[]

// GET /parents/:id/children/:childId/exam-results
// Response: ExamResult[]

// GET /parents/:id/children/:childId/remarks
// Response: StudentRemark[]

// GET /parents/:id/children/:childId/progress
// Response: StudentProgress[]

// ============== ATTENDANCE ===============
// POST /attendance/mark
// Request: { classId, date, records: Array<{ studentId, status, remarks? }> }
// Response: { message: string }

// GET /attendance?classId=x&startDate=y&endDate=z
// Response: AttendanceRecord[]

// GET /attendance/student?studentId=x&startDate=y&endDate=z
// Response: AttendanceRecord[]

// PUT /attendance/:id
// Request: { status, remarks? }
// Response: AttendanceRecord

// DELETE /attendance/:id
// Response: { message: string }

// GET /attendance/report/:studentId
// Response: { totalDays, presentDays, absentDays, leaveDays, percentage }

// ============== TEST RESULTS ===============
// GET /test-results?page=1&limit=10
// Response: { data: TestResult[], total: number }

// POST /test-results
// Request: Partial<TestResult>
// Response: TestResult

// POST /test-results/bulk
// Request: { records: Partial<TestResult>[] }
// Response: { message: string, count: number }

// GET /test-results/:id
// Response: TestResult

// GET /test-results/student/:studentId
// Response: TestResult[]

// GET /test-results/class/:classId
// Response: TestResult[]

// GET /test-results/class/:classId/performance
// Response: { classAverage, topStudents, lowestScores }

// PUT /test-results/:id
// Request: Partial<TestResult>
// Response: TestResult

// DELETE /test-results/:id
// Response: { message: string }

// ============== EXAM RESULTS ===============
// GET /exam-results?page=1&limit=10
// Response: { data: ExamResult[], total: number }

// POST /exam-results
// Request: Partial<ExamResult>
// Response: ExamResult

// POST /exam-results/bulk
// Request: { records: Partial<ExamResult>[] }
// Response: { message: string, count: number }

// GET /exam-results/:id
// Response: ExamResult

// GET /exam-results/student/:studentId
// Response: ExamResult[]

// GET /exam-results/class/:classId
// Response: ExamResult[]

// GET /exam-results/class/:classId/performance
// Response: { classAverage, topStudents, lowestScores }

// PUT /exam-results/:id
// Request: Partial<ExamResult>
// Response: ExamResult

// DELETE /exam-results/:id
// Response: { message: string }

// ============== FEES ===============
// GET /fees?page=1&limit=10
// Response: { data: FeeRecord[], total: number }

// POST /fees
// Request: Partial<FeeRecord>
// Response: FeeRecord

// GET /fees/:id
// Response: FeeRecord

// GET /fees/student/:studentId
// Response: FeeRecord[]

// GET /fees/parent/:parentId
// Response: FeeRecord[]

// GET /fees/class/:classId
// Response: FeeRecord[]

// PUT /fees/:id
// Request: Partial<FeeRecord>
// Response: FeeRecord

// PUT /fees/:id/payment
// Request: { amount: number, paymentDate?: Date }
// Response: FeeRecord

// DELETE /fees/:id
// Response: { message: string }

// GET /fees/report/:parentId
// Response: { totalFee, totalPaid, totalPending, records }

// GET /fees/due/:studentId
// Response: { dueAmount, lastPaymentDate? }

// ============== REMARKS ===============
// POST /remarks
// Request: { studentId, comment, type, date }
// Response: StudentRemark

// GET /remarks/student/:studentId
// Response: StudentRemark[]

// PUT /remarks/:id
// Request: Partial<StudentRemark>
// Response: StudentRemark

// DELETE /remarks/:id
// Response: { message: string }

// ============== PROGRESS REPORTS ===============
// POST /progress/upload
// Request: FormData { studentId, file }
// Response: StudentProgress

// GET /progress/student/:studentId
// Response: StudentProgress[]

// DELETE /progress/:id
// Response: { message: string }
