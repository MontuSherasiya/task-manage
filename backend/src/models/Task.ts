import mongoose, { Document, Schema } from 'mongoose';

export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Pending' | 'Completed';

export interface ITask extends Document {
  title: string;
  description: string;
  priority: Priority;
  dueDate?: Date;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: [true, 'Priority is required'],
    },
    dueDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);