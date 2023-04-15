import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SplashScreen from './SplashScreen';
import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
import OnboardingScreen3 from './OnboardingScreen3';
import AuthScreen from './AuthScreen';
import ChatScreen from './ChatScreen';
import BottomTabNavigator from './BottomTabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const OnboardingTab = createMaterialTopTabNavigator();
const RootStack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <OnboardingTab.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: 'transparent' },
        tabBarStyle: { display: 'none' },
        swipeEnabled: true,
        animationEnabled: true,
      }}
    >
      <OnboardingTab.Screen name="Onboarding1" component={OnboardingScreen1} />
      <OnboardingTab.Screen name="Onboarding2" component={OnboardingScreen2} />
      <OnboardingTab.Screen name="Onboarding3" component={OnboardingScreen3} />
    </OnboardingTab.Navigator>
  );
};

const OnboardingStackNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
      const userToken = await AsyncStorage.getItem('userToken');
  
      if (alreadyLaunched === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
        if (userToken) {
          navigation.navigate('Main', { user: JSON.parse(userToken) });
        }
      }
    };
  
    checkAuthAndOnboarding();
  }, [navigation]);


  if (isFirstLaunch === null) {
    console.log(`это не первый запуск`)
    return null;
  } else if (isFirstLaunch === true) {
    return (
      console.log('это первый запуск'),
      <RootStack.Navigator initialRouteName="Splash">
        {/* <RootStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        /> */}
        <RootStack.Screen
          name="Onboarding"
          component={OnboardingNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
          initialParams={{ rootNavigation: navigation }}
        />
        <RootStack.Screen name="Chat" component={ChatScreen} />
        <RootStack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    );
  } else {
    return (
      <RootStack.Navigator initialRouteName="Splash">
        {/* <RootStack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        /> */}
        <RootStack.Screen name="Auth" component={AuthScreen} />
        <RootStack.Screen name="Chat" component={ChatScreen} />
        <RootStack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    );
  }
};

export default OnboardingStackNavigator;
