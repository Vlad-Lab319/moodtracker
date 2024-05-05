import React from 'react';
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { format } from 'date-fns';
import { MoodOptionTypeWithTimeStamp } from '../../types';
import { theme } from '../../theme';
import { useAppContext } from '../App.provider';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

type MoodItemRowProps = {
  item: MoodOptionTypeWithTimeStamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const appContext = useAppContext();
  const translateX = useSharedValue(0);

  const maxSwipe = 80;

  const handleDelete = React.useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.handleDeleteMood(item);
  }, [appContext, item]);

  const panGesture = Gesture.Pan()
    .onChange(e => {
      translateX.value = e.translationX;
    })
    .onEnd(e => {
      if (Math.abs(e.translationX) > maxSwipe) {
        translateX.value = withTiming(1000 * Math.sign(e.translationX));
        runOnJS(handleDelete)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: translateX.value }],
    }),
    [],
  );

  return (
    <GestureDetector gesture={panGesture}>
      <Reanimated.View style={[styles.moodItemRow, cardStyle]}>
        <View style={styles.moodSet}>
          <Text style={styles.moodIcon}>{item.mood.emoji} </Text>
          <Text style={styles.moodDescription}>{item.mood.description} </Text>
        </View>
        <Text style={styles.moodDate}>
          {format(new Date(item.timestamp), "d MMM yyyy 'at' hh:mmaaa")}
        </Text>
        <Pressable onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      </Reanimated.View>
    </GestureDetector>
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
    margin: 10,
  },
  deleteText: {
    color: theme.colorBlue,
  },
});
