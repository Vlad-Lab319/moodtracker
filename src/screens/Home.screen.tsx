import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { MoodPicker } from '../components/MoodPicker';
import { useAppContext } from '../../App.provider';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home: React.FC = () => {
  const appContext = useAppContext();

  return (
    <View style={styles.home}>
      <Image source={{ uri: imageUrl }} style={styles.backgroundImage} />
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <MoodPicker handleSelectMood={appContext.handleSelectMood} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
  },
});
