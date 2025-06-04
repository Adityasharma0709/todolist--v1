import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { getCategoryColor } from '../utils/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const categoryColor = getCategoryColor(task.category);
  
  return (
    <div className="group mb-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggle(task.id)}
            className="focus:outline-none"
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? (
              <CheckCircle size={22} className="text-green-500" />
            ) : (
              <Circle size={22} className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400" />
            )}
          </button>
          
          <div className="flex-1">
            <p className={`text-gray-800 dark:text-gray-200 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
              {task.title}
            </p>
            <div className="flex items-center mt-1">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${categoryColor}`}></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;