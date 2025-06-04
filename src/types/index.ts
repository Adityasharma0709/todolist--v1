export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  createdAt: string;
  completedAt: string | null;
}

export interface DayStreak {
  date: string;
  count: number;
}

export type ThemeMode = 'light' | 'dark';