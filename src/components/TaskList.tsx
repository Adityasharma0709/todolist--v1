import React from 'react';
import { Trash } from 'lucide-react';
import TaskItem from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onClearCompleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask,
  onClearCompleted 
}) => {
  const completedCount = tasks.filter(task => task.completed).length;
  
  if (tasks.length === 0) {
    return (
      <div className="py-10 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <p className="text-gray-500 dark:text-gray-400">No tasks yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Your Tasks ({tasks.length})
        </h2>
        
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="flex items-center text-sm text-red-500 hover:text-red-600"
          >
            <Trash size={16} className="mr-1" />
            Clear completed ({completedCount})
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;