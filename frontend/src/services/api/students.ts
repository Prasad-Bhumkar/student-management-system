import { api } from './api';
import {
  Student,
  StudentFilters,
  CreateStudentData,
  UpdateStudentData,
  StudentsListResponse,
  ImportResult,
  Course,
  Assignment,
  StudentStats,
} from '../../types/student';

const studentApi = {
  getStudents: async (
    page: number,
    limit: number,
    filters?: StudentFilters
  ): Promise<StudentsListResponse> => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await api.get(`/api/students?${queryParams.toString()}`);
    return response.data;
  },

  getStudent: async (id: string): Promise<Student> => {
    const response = await api.get(`/api/students/${id}`);
    return response.data;
  },

  createStudent: async (data: CreateStudentData): Promise<Student> => {
    const response = await api.post('/api/students', data);
    return response.data;
  },

  updateStudent: async (
    id: string,
    data: UpdateStudentData
  ): Promise<Student> => {
    const response = await api.patch(`/api/students/${id}`, data);
    return response.data;
  },

  deleteStudent: async (id: string): Promise<void> => {
    await api.delete(`/api/students/${id}`);
  },

  importStudents: async (file: File): Promise<ImportResult> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/api/students/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  exportStudents: async (filters?: StudentFilters): Promise<Blob> => {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await api.get(`/api/students/export?${queryParams.toString()}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  uploadProfileImage: async (
    studentId: string,
    file: File
  ): Promise<{ profileImage: string }> => {
    const formData = new FormData();
    formData.append('profileImage', file);
    const response = await api.post(
      `/api/students/${studentId}/profile-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  getStudentStats: async (studentId: string): Promise<StudentStats> => {
    const response = await api.get(`/api/students/${studentId}/stats`);
    return response.data;
  },

  getStudentCourses: async (studentId: string): Promise<Course[]> => {
    const response = await api.get(`/api/students/${studentId}/courses`);
    return response.data;
  },

  getStudentAssignments: async (studentId: string): Promise<Assignment[]> => {
    const response = await api.get(`/api/students/${studentId}/assignments`);
    return response.data;
  },

  getStudentSchedule: async (studentId: string): Promise<Course[]> => {
    const response = await api.get(`/api/students/${studentId}/schedule`);
    return response.data;
  },
};

export default studentApi;
