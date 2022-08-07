/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import Dir from './components/Dir';
import {Provider as PaperProvider} from 'react-native-paper';
import store from './store';
import {Provider} from 'react-redux';
// for dispatch action
import {useAppDispatch} from './components/slices/hooks';
import {setDir} from './components/slices/currentDirSlice';
import RNFS from 'react-native-fs';
// for navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigationBar from './components/NavigationBar';
// theming
import {DefaultTheme} from 'react-native-paper';
import {DarkTheme} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  // set path
  const dispatch = useAppDispatch();
  dispatch(setDir(RNFS.ExternalStorageDirectoryPath));

  return (
    <SafeAreaView>
      <Dir />
    </SafeAreaView>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // set theme object
  const theme: ReactNativePaper.Theme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{header: props => <NavigationBar {...props} />}}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
