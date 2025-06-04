import { useState, useEffect } from 'react';
import { Task } from '../types';
import { saveTasksToStorage, getTasksFromStorage } from '../utils/storage';
import { updateStreaks } from '../utils/streak';
import { createTask, toggleTaskCompletion } from '../utils/task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTasks = getTasksFromStorage();
    setTasks(storedTasks);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTasksToStorage(tasks);
      updateStreaks(tasks);
    }
  }, [tasks, isLoading]);

  const addTask = (title: string, category: string) => {
    const newTask = createTask(title, category);
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? toggleTaskCompletion(task) : task
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  };

  return {
    tasks,
    isLoading,
    addTask,
    removeTask,
    toggleTask,
    clearCompletedTasks
  };
};