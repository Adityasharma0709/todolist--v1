import { Task, DayStreak } from '../types';

const TASKS_KEY = 'todo-streak-tasks';
const STREAKS_KEY = 'todo-streak-streaks';
const THEME_KEY = 'todo-streak-theme';

export const saveTasksToStorage = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTasksFromStorage = (): Task[] => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveStreaksToStorage = (streaks: DayStreak[]): void => {
  localStorage.setItem(STREAKS_KEY, JSON.stringify(streaks));
};

export const getStreaksFromStorage = (): DayStreak[] => {
  const streaks = localStorage.getItem(STREAKS_KEY);
  return streaks ? JSON.parse(streaks) : [];
};

export const saveThemeToStorage = (theme: string): void => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getThemeFromStorage = (): string => {
  return localStorage.getItem(THEME_KEY) || 'light';
};