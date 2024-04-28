export type MoodOptionType = {
  emoji: string;
  description: string;
};

export type MoodOptionTypeWithTimeStamp = {
  mood: MoodOptionType;
  timestamp: number;
};
