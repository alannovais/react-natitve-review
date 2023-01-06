/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';

//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//database
import CreateDB from './src/db/CreateDB';
//pages
import LoginScreen from './src/pages/LoginView';
import LobbyScreen from './src/pages/LobbyView';
import TodoListManagerView from './src/pages/TodoListManagerView';
import {NativeBaseProvider} from 'native-base';

const App: () => Node = () => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    CreateDB();
  }, []);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Lobby"
            options={{headerShown: false}}
            component={LobbyScreen}
          />
          <Stack.Screen
            name="TodoListManager"
            options={{headerShown: false}}
            component={TodoListManagerView}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
