import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator';
import { AppProvider } from './App.provider';

import { Platform, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer>
          <BottomTabsNavigator />
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
};
