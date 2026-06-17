'use client';

import { useState, useEffect, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Plus, ListTodo, RefreshCw } from 'lucide-react';
import { Task, TaskFormData } from '@/types/task';
import { taskService } from '@/lib/api';
import TaskCard from '@/components/TaskCard';
import TaskForm from '@/components/TaskForm';
 
export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks(priorityFilter, statusFilter);
      setTasks(data);
    } catch {
      toast.error('Failed to load tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [priorityFilter, statusFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (formData: TaskFormData) => {
    try {
      await taskService.createTask(formData);
      toast.success('Task created!');
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      throw err;
    }
  };

  const handleUpdate = async (formData: TaskFormData) => {
    if (!editingTask) return;
    try {
      await taskService.updateTask(editingTask._id, formData);
      toast.success('Task updated!');
      setEditingTask(null);
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update task');
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this task?')) return;
    try {
      await taskService.deleteTask(id);
      toast.success('Task deleted');
      fetchTasks();
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleMarkComplete = async (id: string) => {
    try {
      await taskService.markComplete(id);
      toast.success('Task marked as complete! ✅');
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to mark task as complete');
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    pending: tasks.filter((t) => t.status === 'Pending').length,
    high: tasks.filter((t) => t.priority === 'High' && t.status === 'Pending').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <ListTodo size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">TaskFlow</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Task Management App</p>
            </div>
          </div>
          <button
            onClick={() => { setEditingTask(null); setShowForm(true); }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus size={16} />
            Add Task
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Tasks', value: stats.total, color: 'text-gray-900' },
            { label: 'Completed', value: stats.completed, color: 'text-green-600' },
            { label: 'Pending', value: stats.pending, color: 'text-yellow-600' },
            { label: 'High Priority', value: stats.high, color: 'text-red-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-black text-sm border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {['All', 'High', 'Medium', 'Low'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-black text-sm border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {['All', 'Pending', 'Completed'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchTasks}
              className="ml-auto flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
            >
              <RefreshCw size={12} />
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16">
            <ListTodo size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-500 font-medium">No tasks found</h3>
            <p className="text-gray-400 text-sm mt-1">
              {priorityFilter !== 'All' || statusFilter !== 'All'
                ? 'Try changing the filters'
                : 'Click "Add Task" to get started'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={(t) => { setEditingTask(t); setShowForm(true); }}
                onDelete={handleDelete}
                onMarkComplete={handleMarkComplete}
              />
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onClose={() => { setShowForm(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
}
