export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Pending' | 'Completed';

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate?: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: Status;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
