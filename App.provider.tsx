import React, { createContext } from 'react';
import { MoodOptionType, MoodOptionTypeWithTimeStamp } from './types';

type AppContextType = {
  moodList: MoodOptionTypeWithTimeStamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
});

export const AppProvider: React.FC<any> = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionTypeWithTimeStamp[]>(
    [],
  );

  const handleSelectMood = React.useCallback((selectedMood: MoodOptionType) => {
    setMoodList(current => [
      ...current,
      { mood: selectedMood, timestamp: Date.now() },
    ]);
  }, []);

  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
