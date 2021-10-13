import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import firebaseConfig from './config/firebaseConfig'
import { createFirestoreInstance } from 'redux-firestore'
import { Provider as StoreProvider, useSelector } from 'react-redux';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { Text, View } from 'react-native';
import store from './store/store';
import MainScreen from './screens/MainScreen';
import InterestScreen from './screens/InterestScreen';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}

const rrfProps = {
  firebase: firebaseConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5280E9",
    accent: "#FFFFA8",
  }
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <View><Text>Loading...</Text></View>;
  return children
}

const Stack = createNativeStackNavigator();

export default function App() { 
  return (
    <StoreProvider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsLoaded>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false}}
              >
                <Stack.Screen name="Landing" component={LandingScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="Main" component={MainScreen}/>
                <Stack.Screen name="Interest" component={InterestScreen}/>
              </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </StoreProvider>
  );
}