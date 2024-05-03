import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { MoodOptionType } from '../../types';
import { moodOptions } from '../data/moodOptions';
import { theme } from '../../theme';

const imageSrc = require('../../assets/images/butterflies.png');

type MoodPickerProps = {
  handleSelectMood: (moodOption: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ handleSelectMood }) => {
  const [selectedMood, setSelectedMood] = React.useState<MoodOptionType>();
  const [isSelected, setSelected] = useState(false);

  const handleSelect = React.useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
      setSelected(true);
    }
  }, [handleSelectMood, selectedMood]);

  if (isSelected) {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={imageSrc} />
        <Pressable style={styles.buttonPick} onPress={() => setSelected(false)}>
          <Text style={styles.buttonPickText}>Pick another one</Text>
        </Pressable>
      </View>
    );
  }

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
    margin: 10,
    padding: 10,
    height: 250,
    flexDirection: 'column',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.colorPurple,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  header: {
    marginTop: 5,
    fontSize: 22,
    letterSpacing: 1,
    textAlign: 'center',
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyRegular,
  },
  list: {
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    // alignSelf: 'center',
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
    textAlign: 'center',
    fontSize: 10,
    fontFamily: theme.fontFamilyBold,
  },
  buttonPick: {
    marginBottom: 20,
    padding: 8,
    width: 'auto',
    minWidth: 120,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colorPurple,
    borderRadius: 20,
  },
  buttonPickText: {
    color: theme.colorWhite,
    fontFamily: theme.fontFamilyBold,
    margin: 5,
  },
  image: {
    // alignSelf: 'center',
  },
});
