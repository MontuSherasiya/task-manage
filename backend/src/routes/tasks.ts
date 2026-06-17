import { Router, Request, Response } from 'express';
import Task from '../models/Task';

const router = Router();


// GET all tasks (with optional filters)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { priority, status } = req.query;
    const filter: Record<string, string> = {};
    if (priority && typeof priority === 'string') filter.priority = priority;
    if (status && typeof status === 'string') filter.status = status;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST create task
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    if (!title || !description || !priority) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and priority are required.',
      });
    }

    const task = await Task.create({ title, description, priority, dueDate, status });
    res.status(201).json({ success: true, data: task });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e: any) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT update task
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (status !== undefined) task.status = status;

    await task.save();
    res.json({ success: true, data: task });
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e: any) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE task
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PATCH mark complete
router.patch('/:id/complete', async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Logical validation
    if (!task.dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Task cannot be marked as Completed because it has no Due Date.',
      });
    }

    if (!task.description || task.description.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: `Task cannot be marked as Completed because the description is too short (minimum 20 characters, current: ${task.description?.trim().length ?? 0}).`,
      });
    }

    task.status = 'Completed';
    await task.save();
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
