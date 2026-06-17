import axios from 'axios';
import { Task, TaskFormData, ApiResponse } from '@/types/task';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export const taskService = {
  getTasks: async (priority?: string, status?: string): Promise<Task[]> => {
    const params: Record<string, string> = {};
    if (priority && priority !== 'All') params.priority = priority;
    if (status && status !== 'All') params.status = status;
    const { data } = await api.get<ApiResponse<Task[]>>('/tasks', { params });
    return data.data || [];
  },

  createTask: async (task: TaskFormData): Promise<Task> => {
    const { data } = await api.post<ApiResponse<Task>>('/tasks', task);
    if (!data.data) throw new Error(data.message || 'Failed to create task');
    return data.data;
  },

  updateTask: async (id: string, task: Partial<TaskFormData>): Promise<Task> => {
    const { data } = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task);
    if (!data.data) throw new Error(data.message || 'Failed to update task');
    return data.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  markComplete: async (id: string): Promise<Task> => {
    const { data } = await api.patch<ApiResponse<Task>>(`/tasks/${id}/complete`);
    if (!data.data) throw new Error(data.message || 'Failed to mark task as complete');
    return data.data;
  },
};
