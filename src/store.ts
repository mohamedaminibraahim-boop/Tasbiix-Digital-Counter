import { useState, useEffect } from 'react';
import { format, isSameDay, parseISO, subDays } from 'date-fns';
import { PRELOADED_TASBIIX, type Tasbiix, type UserStats, type AppSettings } from './types';

const STORAGE_KEYS = {
  TASBIIX: 'tasbiix_data',
  STATS: 'tasbiix_stats',
  SETTINGS: 'tasbiix_settings',
};

export function useTasbiixStore() {
  const [tasbiixList, setTasbiixList] = useState<Tasbiix[]>([]);
  const [stats, setStats] = useState<UserStats>({
    lastActiveDate: new Date().toISOString(),
    streak: 0,
    dailyHistory: {},
  });
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    theme: 'system',
    vibrationEnabled: true,
    soundEnabled: true,
  });
  const [activeId, setActiveId] = useState<string>('astaghfirullah');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial data
  useEffect(() => {
    try {
      const savedTasbiix = localStorage.getItem(STORAGE_KEYS.TASBIIX);
      const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);

      if (savedTasbiix) {
        setTasbiixList(JSON.parse(savedTasbiix));
      } else {
        setTasbiixList(PRELOADED_TASBIIX);
      }

      if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        checkDailyReset(parsedStats);
      } else {
        setStats({
          lastActiveDate: new Date().toISOString(),
          streak: 0,
          dailyHistory: {},
        });
      }

      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load data from localStorage', error);
      setTasbiixList(PRELOADED_TASBIIX);
      setStats({
        lastActiveDate: new Date().toISOString(),
        streak: 0,
        dailyHistory: {},
      });
      setSettings({
        language: 'en',
        theme: 'system',
        vibrationEnabled: true,
        soundEnabled: true,
      });
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Check for daily reset and streak
  const checkDailyReset = (currentStats: UserStats) => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    const lastDate = parseISO(currentStats.lastActiveDate);
    const lastDateStr = format(lastDate, 'yyyy-MM-dd');

    let newStats = { ...currentStats };

    if (todayStr !== lastDateStr) {
      // It's a new day
      // Check streak
      const yesterday = subDays(today, 1);
      const yesterdayStr = format(yesterday, 'yyyy-MM-dd');
      
      if (lastDateStr === yesterdayStr) {
        // Streak continues if they were active yesterday
        // (Actually streak should only increment if they did some dhikr, 
        // but let's keep it simple: if they open the app daily)
      } else if (todayStr !== lastDateStr) {
        // Streak broken if more than one day gap
        if (!isSameDay(lastDate, yesterday) && !isSameDay(lastDate, today)) {
           newStats.streak = 0;
        }
      }

      // Reset daily counts in tasbiix list
      setTasbiixList(prev => {
        const updated = prev.map(t => ({ ...t, dailyCount: 0 }));
        localStorage.setItem(STORAGE_KEYS.TASBIIX, JSON.stringify(updated));
        return updated;
      });

      newStats.lastActiveDate = today.toISOString();
      setStats(newStats);
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
    } else {
      setStats(currentStats);
    }
  };

  // Save data whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.TASBIIX, JSON.stringify(tasbiixList));
    }
  }, [tasbiixList, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    }
  }, [stats, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      
      // Apply theme
      const root = window.document.documentElement;
      const isDark = settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [settings, isLoaded]);

  const incrementCount = (id: string) => {
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    
    setTasbiixList(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          currentCount: t.currentCount + 1,
          dailyCount: t.dailyCount + 1,
          lifetimeCount: t.lifetimeCount + 1,
        };
      }
      return t;
    }));

    setStats(s => {
      const newHistory = { ...s.dailyHistory };
      newHistory[todayStr] = (newHistory[todayStr] || 0) + 1;
      
      let newStreak = s.streak;
      const lastDate = parseISO(s.lastActiveDate);
      if (!isSameDay(lastDate, new Date())) {
         if (isSameDay(lastDate, subDays(new Date(), 1))) {
           newStreak += 1;
         } else {
           newStreak = 1;
         }
      } else if (newStreak === 0) {
        newStreak = 1;
      }

      return {
        ...s,
        streak: newStreak,
        lastActiveDate: new Date().toISOString(),
        dailyHistory: newHistory,
      };
    });
  };

  const resetTasbiix = (id: string, type: 'session' | 'daily' | 'all') => {
    setTasbiixList(prev => prev.map(t => {
      if (t.id === id) {
        if (type === 'session') return { ...t, currentCount: 0 };
        if (type === 'daily') return { ...t, dailyCount: 0, currentCount: 0 };
        if (type === 'all') return { ...t, currentCount: 0, dailyCount: 0, lifetimeCount: 0 };
      }
      return t;
    }));
  };

  const fullReset = () => {
    setTasbiixList(PRELOADED_TASBIIX);
    setStats({
      lastActiveDate: new Date().toISOString(),
      streak: 0,
      dailyHistory: {},
    });
    localStorage.clear();
  };

  const addCustomTasbiix = (name: string, arabic: string, goal: number) => {
    const newTasbiix: Tasbiix = {
      id: Date.now().toString(),
      name: { en: name, ar: name, so: name },
      arabic,
      currentCount: 0,
      dailyCount: 0,
      lifetimeCount: 0,
      goal,
      isFavorite: false,
      isCustom: true,
    };
    setTasbiixList(prev => [...prev, newTasbiix]);
  };

  const deleteTasbiix = (id: string) => {
    setTasbiixList(prev => prev.filter(t => t.id !== id));
    if (activeId === id) setActiveId('astaghfirullah');
  };

  const toggleFavorite = (id: string) => {
    setTasbiixList(prev => prev.map(t => t.id === id ? { ...t, isFavorite: !t.isFavorite } : t));
  };

  const updateGoal = (id: string, goal: number) => {
    setTasbiixList(prev => prev.map(t => t.id === id ? { ...t, goal } : t));
  };

  return {
    tasbiixList,
    activeTasbiix: tasbiixList.find(t => t.id === activeId) || tasbiixList[0],
    activeId,
    setActiveId,
    stats,
    settings,
    setSettings,
    incrementCount,
    resetTasbiix,
    fullReset,
    addCustomTasbiix,
    deleteTasbiix,
    toggleFavorite,
    updateGoal,
    isLoaded,
  };
}
