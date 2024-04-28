import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MoodOptionType } from '../../types';
import { moodOptions } from '../data/moodOptions';
import { theme } from '../../theme';

type MoodPickerProps = {
  handleSelectMood: (moodOption: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ handleSelectMood }) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
    }
  }, [handleSelectMood, selectedMood]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>How are you right now?</Text>
      <View style={styles.list}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              style={[
                styles.moodItem,
                selectedMood?.emoji === option.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}
              key={option.description}
              onPress={() => setSelectedMood(option)}>
              <Text style={styles.emoji}>{option.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {option.emoji === selectedMood?.emoji
                ? option.description
                : undefined}
            </Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.buttonPick} onPress={handleSelect}>
        <Text style={styles.buttonPickText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.colorPurple,
  },
  header: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 22,
    letterSpacing: 1,
    textAlign: 'center',
    color: theme.colorPurple,
  },
  list: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
  },
  moodItem: {
    margin: 5,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: '#fff',
  },
  emoji: {
    fontSize: 24,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
  },
  buttonPick: {
    marginBottom: 20,
    padding: 8,
    width: 120,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorPurple,
    borderRadius: 20,
  },
  buttonPickText: {
    fontWeight: 'bold',
    color: theme.colorWhite,
  },
});
