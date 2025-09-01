import React from 'react';
import { format, parseISO, subDays } from 'date-fns';
import { Task, DayStreak } from '../types';
import { getCurrentStreak, getLongestStreak, getCompletionRate } from '../utils/streak';
import { Trophy, Calendar, Zap } from 'lucide-react';

interface StreakDisplayProps {
  tasks: Task[];
  streakData: DayStreak[];
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ tasks, streakData }) => {
  const currentStreak = getCurrentStreak(tasks);
  const longestStreak = getLongestStreak(tasks);
  const completionRate = getCompletionRate(tasks);
  
  // Get dates for the last 21 days (3 weeks)
  const getLastDays = (days: number) => {
    const result = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(today, i);
      const dateString = format(date, 'yyyy-MM-dd');
      const dayData = streakData.find(d => d.date === dateString);
      
      result.push({
        date: dateString,
        count: dayData ? dayData.count : 0,
        display: format(date, 'd'),
        weekday: format(date, 'EEE')
      });
    }
    
    return result;
  };
  
  const lastDays = getLastDays(21);
  
  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-gray-200 dark:bg-gray-700';
    if (count === 1) return 'bg-green-200 dark:bg-green-900';
    if (count === 2) return 'bg-green-300 dark:bg-green-800';
    if (count === 3) return 'bg-green-400 dark:bg-green-700';
    return 'bg-green-500 dark:bg-green-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Your Productivity Streak</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <Zap size={16} className="text-yellow-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Current Streak</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{currentStreak} day{currentStreak !== 1 ? 's' : ''}</p>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <Trophy size={16} className="text-amber-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Longest Streak</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{longestStreak} day{longestStreak !== 1 ? 's' : ''}</p>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <div className="flex items-center mb-1">
            <Calendar size={16} className="text-blue-500 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Completion Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completionRate}%</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Last 3 weeks</h3>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['T', 'W', 'T', 'F', 'S', 'S','M'].map((day, idx) => (
            <div key={idx} className="text-center text-xs text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {lastDays.map((day, idx) => (
            <div 
              key={idx}
              className={`aspect-square rounded-sm ${getIntensityClass(day.count)} transition-colors duration-300 hover:opacity-80 group relative`}
              title={`${day.weekday}, ${day.display}: ${day.count} tasks completed`}
            >
              <div className="invisible group-hover:visible absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                {format(parseISO(day.date), 'MMM d')}: {day.count} task{day.count !== 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreakDisplay;