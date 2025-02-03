export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  dateOfBirth: string;
  enrollmentDate: string;
  grade: string;
  status: 'active' | 'inactive' | 'pending';
  phoneNumber: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  guardianInfo?: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email: string;
  };
  academicInfo?: {
    gpa: number;
    major: string;
    classLevel: string;
    advisorId: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  credits: number;
  instructor: string;
  schedule: {
    days: string[];
    time: string;
    room: string;
  };
  grade?: string;
  progress: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  status: string;
  grade?: number;
  submitted?: boolean;
}

export interface CreateStudentData extends Omit<Student, 'id' | 'createdAt' | 'updatedAt'> {
  password: string;
}

export type UpdateStudentData = Partial<Omit<Student, 'id' | 'createdAt' | 'updatedAt'>>;

export interface StudentFilters {
  search?: string;
  status?: Student['status'];
  grade?: string;
  startDate?: string;
  endDate?: string;
  [key: string]: string | undefined;
}

export interface StudentsListResponse {
  students: Student[];
  total: number;
  page: number;
  limit: number;
}

export interface ImportResult {
  imported: number;
  failed: number;
  errors?: Array<{
    row: number;
    error: string;
  }>;
}

export interface StudentStats {
  totalStudents: number;
  activeStudents: number;
  pendingStudents: number;
  inactiveStudents: number;
  averageGpa: number;
  gradeDistribution: {
    [grade: string]: number;
  };
  enrollmentTrend: Array<{
    date: string;
    count: number;
  }>;
  statusDistribution: {
    active: number;
    inactive: number;
    pending: number;
  };
}
