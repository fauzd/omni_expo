import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import ChatScreen from './screens/ChatScreen';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

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

export default function App() {
  const [fontsLoaded] = useFonts({
    Alice: require('./assets/fonts/Alice-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ cardStyleInterpolator: forFade }}>
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
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
