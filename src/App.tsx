import React, { useEffect, useState } from 'react';
import { DayStreak } from './types';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import StreakDisplay from './components/StreakDisplay';
import { useTasks } from './hooks/useTasks';
import { getStreaksFromStorage } from './utils/storage';
import { calculateStreakData } from './utils/streak';

function App() {
  const { tasks, isLoading, addTask, removeTask, toggleTask, clearCompletedTasks } = useTasks();
  const [streakData, setStreakData] = useState<DayStreak[]>([]);

  useEffect(() => {
    if (!isLoading) {
      const storedStreaks = getStreaksFromStorage();
      if (storedStreaks.length > 0) {
        setStreakData(storedStreaks);
      } else {
        const initialStreakData = calculateStreakData(tasks);
        setStreakData(initialStreakData);
      }
    }
  }, [tasks, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <StreakDisplay tasks={tasks} streakData={streakData} />
        
        <TaskForm onAddTask={addTask} />
        
        <TaskList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={removeTask}
          onClearCompleted={clearCompletedTasks}
        />
      </div>
    </div>
  );
}

export default App;