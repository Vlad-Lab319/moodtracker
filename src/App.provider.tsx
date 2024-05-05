import React, { createContext } from 'react';
import { MoodOptionType, MoodOptionTypeWithTimeStamp } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppData = {
  moodList: MoodOptionTypeWithTimeStamp[];
};

const dataKey = 'mood-app-data';

const setAppData = async (appData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(dataKey, JSON.stringify(appData));
  } catch {}
};
const getAppData = async (): Promise<AppData | null> => {
  try {
    const result = await AsyncStorage.getItem(dataKey);
    if (result) {
      return JSON.parse(result);
    }
  } catch {}

  return null;
};

type AppContextType = {
  moodList: MoodOptionTypeWithTimeStamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
  handleDeleteMood: (moodToDelete: MoodOptionTypeWithTimeStamp) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
  handleDeleteMood: () => {},
});

export const AppProvider: React.FC<any> = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionTypeWithTimeStamp[]>(
    [],
  );

  const handleSelectMood = React.useCallback((selectedMood: MoodOptionType) => {
    setMoodList(current => {
      const newMoodList = [
        ...current,
        { mood: selectedMood, timestamp: Date.now() },
      ];

      setAppData({ moodList: newMoodList });
      return newMoodList;
    });
  }, []);

  const handleDeleteMood = React.useCallback(
    (mood: MoodOptionTypeWithTimeStamp) => {
      setMoodList(current => {
        const newMoodList = current.filter(
          val => val.timestamp !== mood.timestamp,
        );

        setAppData({ moodList: newMoodList });
        return newMoodList;
      });
    },
    [],
  );

  React.useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };
    fetchAppData();
  }, []);

  return (
    <AppContext.Provider
      value={{ moodList, handleSelectMood, handleDeleteMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
