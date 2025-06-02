import React, { createContext, useContext, useState } from 'react';

interface ReadingProgress {
  [chapterId: string]: {
    progress: number; // 0-100
    lastReadAt: Date;
    bookmarked: boolean;
  };
}

interface UserPreferences {
  readingProgress: ReadingProgress;
  favoriteChapters: string[];
  readingGoals: {
    dailyMinutes: number;
    weeklyChapters: number;
  };
}

interface UserContextType {
  preferences: UserPreferences;
  updateProgress: (chapterId: string, progress: number) => Promise<void>;
  toggleBookmark: (chapterId: string) => Promise<void>;
  addToFavorites: (chapterId: string) => Promise<void>;
  removeFromFavorites: (chapterId: string) => Promise<void>;
  setReadingGoals: (goals: { dailyMinutes: number; weeklyChapters: number }) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultPreferences: UserPreferences = {
  readingProgress: {
    '1': { progress: 75, lastReadAt: new Date(), bookmarked: true },
    '2': { progress: 40, lastReadAt: new Date(), bookmarked: false },
  },
  favoriteChapters: ['1'],
  readingGoals: {
    dailyMinutes: 30,
    weeklyChapters: 2,
  },
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  const updateProgress = async (chapterId: string, progress: number) => {
    setPreferences(prev => ({
      ...prev,
      readingProgress: {
        ...prev.readingProgress,
        [chapterId]: {
          ...prev.readingProgress[chapterId],
          progress: Math.min(100, Math.max(0, progress)),
          lastReadAt: new Date(),
          bookmarked: prev.readingProgress[chapterId]?.bookmarked || false,
        },
      },
    }));
  };

  const toggleBookmark = async (chapterId: string) => {
    setPreferences(prev => {
      const currentBookmarked = prev.readingProgress[chapterId]?.bookmarked || false;
      return {
        ...prev,
        readingProgress: {
          ...prev.readingProgress,
          [chapterId]: {
            progress: prev.readingProgress[chapterId]?.progress || 0,
            lastReadAt: prev.readingProgress[chapterId]?.lastReadAt || new Date(),
            bookmarked: !currentBookmarked,
          },
        },
      };
    });
  };

  const addToFavorites = async (chapterId: string) => {
    setPreferences(prev => {
      if (!prev.favoriteChapters.includes(chapterId)) {
        return {
          ...prev,
          favoriteChapters: [...prev.favoriteChapters, chapterId],
        };
      }
      return prev;
    });
  };

  const removeFromFavorites = async (chapterId: string) => {
    setPreferences(prev => ({
      ...prev,
      favoriteChapters: prev.favoriteChapters.filter(id => id !== chapterId),
    }));
  };

  const setReadingGoals = async (goals: { dailyMinutes: number; weeklyChapters: number }) => {
    setPreferences(prev => ({
      ...prev,
      readingGoals: goals,
    }));
  };

  return (
    <UserContext.Provider
      value={{
        preferences,
        updateProgress,
        toggleBookmark,
        addToFavorites,
        removeFromFavorites,
        setReadingGoals,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
