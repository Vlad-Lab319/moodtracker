import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { MoodOptionTypeWithTimeStamp } from '../../types';
import { theme } from '../../theme';

type MoodItemRowProps = {
  item: MoodOptionTypeWithTimeStamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  return (
    <View style={styles.moodItemRow}>
      <View style={styles.moodSet}>
        <Text style={styles.moodIcon}>{item.mood.emoji} </Text>
        <Text style={styles.moodDescription}>{item.mood.description} </Text>
      </View>
      <Text style={styles.moodDate}>
        {format(new Date(item.timestamp), "d MMM yyyy 'at' hh:mmaaa")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  moodItemRow: {
    backgroundColor: 'ivory',
    marginTop: 10,
    padding: 10,
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodSet: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIcon: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDescription: {
    color: theme.colorPurple,
    fontSize: 18,
    fontFamily: theme.fontFamilyBold,
  },
  moodDate: {
    color: theme.colorLavander,
    textAlign: 'center',
    fontFamily: theme.fontFamilyLight,
  },
});
