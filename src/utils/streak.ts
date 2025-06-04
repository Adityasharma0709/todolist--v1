import { format, subDays, parseISO, isToday, isYesterday } from 'date-fns';
import { Task, DayStreak } from '../types';
import { getStreaksFromStorage, saveStreaksToStorage } from './storage';

export const calculateStreakData = (tasks: Task[]): DayStreak[] => {
  const streakMap = new Map<string, number>();
  
  // Initialize with past 30 days
  for (let i = 0; i < 30; i++) {
    const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
    streakMap.set(date, 0);
  }

  // Count completed tasks per day
  tasks.forEach(task => {
    if (task.completed && task.completedAt) {
      const completedDate = format(parseISO(task.completedAt), 'yyyy-MM-dd');
      if (streakMap.has(completedDate)) {
        streakMap.set(completedDate, (streakMap.get(completedDate) || 0) + 1);
      }
    }
  });

  // Convert to array and sort by date
  return Array.from(streakMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const updateStreaks = (tasks: Task[]): void => {
  const streakData = calculateStreakData(tasks);
  saveStreaksToStorage(streakData);
};

export const getCurrentStreak = (tasks: Task[]): number => {
  let currentStreak = 0;
  const today = format(new Date(), 'yyyy-MM-dd');
  
  // Check if there's a completed task today
  const completedToday = tasks.some(task => 
    task.completed && 
    task.completedAt && 
    isToday(parseISO(task.completedAt))
  );
  
  if (completedToday) {
    currentStreak = 1;
    
    // Check previous days
    let checkDate = subDays(new Date(), 1);
    let hasPreviousDay = true;
    
    while (hasPreviousDay) {
      const checkDateStr = format(checkDate, 'yyyy-MM-dd');
      const hasCompletedTask = tasks.some(task => 
        task.completed && 
        task.completedAt && 
        format(parseISO(task.completedAt), 'yyyy-MM-dd') === checkDateStr
      );
      
      if (hasCompletedTask) {
        currentStreak++;
        checkDate = subDays(checkDate, 1);
      } else {
        hasPreviousDay = false;
      }
    }
  } else {
    // Check if yesterday had completed tasks (to not break the streak immediately)
    const completedYesterday = tasks.some(task => 
      task.completed && 
      task.completedAt && 
      isYesterday(parseISO(task.completedAt))
    );
    
    if (completedYesterday) {
      currentStreak = 1;
      
      // Check previous days before yesterday
      let checkDate = subDays(new Date(), 2);
      let hasPreviousDay = true;
      
      while (hasPreviousDay) {
        const checkDateStr = format(checkDate, 'yyyy-MM-dd');
        const hasCompletedTask = tasks.some(task => 
          task.completed && 
          task.completedAt && 
          format(parseISO(task.completedAt), 'yyyy-MM-dd') === checkDateStr
        );
        
        if (hasCompletedTask) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        } else {
          hasPreviousDay = false;
        }
      }
    }
  }
  
  return currentStreak;
};

export const getLongestStreak = (tasks: Task[]): number => {
  const streakData = getStreaksFromStorage();
  let longestStreak = 0;
  let currentRun = 0;
  
  streakData.forEach(day => {
    if (day.count > 0) {
      currentRun++;
      longestStreak = Math.max(longestStreak, currentRun);
    } else {
      currentRun = 0;
    }
  });
  
  return longestStreak;
};

export const getCompletionRate = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0;
  
  const completed = tasks.filter(task => task.completed).length;
  return Math.round((completed / tasks.length) * 100);
};