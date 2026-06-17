'use client';

import { Task } from '@/types/task';
import { CheckCircle, Pencil, Trash2, Calendar, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMarkComplete: (id: string) => void;
}

const priorityConfig = {
  High: { label: '🔴 High', class: 'bg-red-50 text-red-700 border-red-200' },
  Medium: { label: '🟡 Medium', class: 'bg-amber-50 text-amber-700 border-amber-200' },
  Low: { label: '🟢 Low', class: 'bg-green-50 text-green-700 border-green-200' },
};

export default function TaskCard({ task, onEdit, onDelete, onMarkComplete }: TaskCardProps) {
  const isCompleted = task.status === 'Completed';
  const priority = priorityConfig[task.priority];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  const isOverdue = task.dueDate && !isCompleted && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow p-5 ${
        isCompleted ? 'opacity-75 border-gray-200' : 'border-gray-200'
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3
            className={`font-semibold text-gray-900 truncate ${
              isCompleted ? 'line-through text-gray-400' : ''
            }`}
          >
            {task.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${priority.class}`}
          >
            {priority.label}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              isCompleted
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {task.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{task.description}</p>

      {/* Dates */}
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
        {task.dueDate && (
          <span className={`flex items-center gap-1 ${isOverdue ? 'text-red-500 font-medium' : ''}`}>
            <Calendar size={12} />
            {isOverdue ? 'Overdue · ' : 'Due: '}
            {formatDate(task.dueDate)}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {formatDate(task.createdAt)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        {!isCompleted && (
          <button
            onClick={() => onMarkComplete(task._id)}
            className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition"
          >
            <CheckCircle size={14} />
            Mark Complete
          </button>
        )}
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition"
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition ml-auto"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
