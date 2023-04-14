import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
import OnboardingScreen3 from './OnboardingScreen3';
import AuthScreen from './AuthScreen';

const OnboardingTab = createMaterialTopTabNavigator();

const OnboardingStackNavigator = () => {
  return (
    <OnboardingTab.Navigator
      initialRouteName="Onboarding1"
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
      <OnboardingTab.Screen name="Auth" component={AuthScreen} />
    </OnboardingTab.Navigator>
  );
};

export default OnboardingStackNavigator;
