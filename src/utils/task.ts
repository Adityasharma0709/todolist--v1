import { v4 as uuidv4 } from 'uuid';
import { Task } from '../types';

export const createTask = (title: string, category: string): Task => {
  return {
    id: uuidv4(),
    title,
    completed: false,
    category,
    createdAt: new Date().toISOString(),
    completedAt: null
  };
};

export const toggleTaskCompletion = (task: Task): Task => {
  if (task.completed) {
    return {
      ...task,
      completed: false,
      completedAt: null
    };
  } else {
    return {
      ...task,
      completed: true,
      completedAt: new Date().toISOString()
    };
  }
};

export const CATEGORIES = [
  { id: 'work', name: 'Work', color: 'bg-blue-500' },
  { id: 'personal', name: 'Personal', color: 'bg-green-500' },
  { id: 'health', name: 'Health', color: 'bg-red-500' },
  { id: 'learning', name: 'Learning', color: 'bg-purple-500' },
  { id: 'other', name: 'Other', color: 'bg-gray-500' }
];

export const getCategoryColor = (categoryId: string): string => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category ? category.color : 'bg-gray-500';
};