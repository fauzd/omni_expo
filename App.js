import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import ChatScreen from './screens/ChatScreen';
import AuthScreen from './screens/AuthScreen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import OnboardingScreen from './screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingStackNavigator from './screens/OnboardingStackNavigator';
import BottomTabNavigator from './screens/BottomTabNavigator';

import UserContext from './src/UserContext';
import { ChatProvider } from './src/ChatContext';


const MainStack = createStackNavigator();

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
  transitionSpec: {
    open: {
      ...TransitionSpecs.TransitionIOSSpec,
      animation: 'timing',
      config: {
        duration: 1000,
      },
    },
    close: {
      ...TransitionSpecs.TransitionIOSSpec,
      animation: 'timing',
      config: {
        duration: 1000,
      },
    },
  },
});

const resetOnboarding = async (navigation) => {
  try {
    await AsyncStorage.removeItem('onboardingCompleted');
    console.log('Onboarding reset');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Splash' }],
    });
  } catch (error) {
    console.error('Error resetting onboarding:', error);
  }
};


function MainStackNavigator() {
  return (
    <MainStack.Navigator initialRouteName="Splash" screenOptions={{ cardStyleInterpolator: forFade }}>
      <MainStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Onboarding"
        component={OnboardingStackNavigator} options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
        initialParams={{ user: null }}
      />
      <MainStack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              onPress={() => resetOnboarding(navigation)}
              title="Сбросить Onboarding"
            />
          ),
        })}
      />
    </MainStack.Navigator>
  );
}

export default function App() {

  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    Alice: require('./assets/fonts/Alice-Regular.ttf'),
  });

  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboardingValue = await AsyncStorage.getItem('onboardingCompleted');
        setOnboardingCompleted(onboardingValue === 'true');
      } catch (error) {
        console.error('Error checking onboarding:', error);
      }
    };
    checkOnboarding();
  }, []);

  if (!fontsLoaded || onboardingCompleted === null) {
    return <AppLoading />;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ChatProvider>
        <View style={styles.container}>
          <NavigationContainer>
            {onboardingCompleted ? (
              <MainStackNavigator />
            ) : (
              <OnboardingStackNavigator />
            )}
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </ChatProvider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'Alice',
    fontSize: 34,
  },
});
