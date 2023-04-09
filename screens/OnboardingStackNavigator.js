import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen1 from './OnboardingScreen1';
import OnboardingScreen2 from './OnboardingScreen2';
import OnboardingScreen3 from './OnboardingScreen3';

const OnboardingStack = createStackNavigator();

const OnboardingStackNavigator = () => {
  return (
    <OnboardingStack.Navigator initialRouteName="Onboarding1" screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Onboarding1" component={OnboardingScreen1} />
      <OnboardingStack.Screen name="Onboarding2" component={OnboardingScreen2} />
      <OnboardingStack.Screen name="Onboarding3" component={OnboardingScreen3} />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingStackNavigator;
