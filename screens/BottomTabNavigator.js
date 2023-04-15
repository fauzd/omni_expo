import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ChatsScreen from './ListScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation, user }) => {
  
  return (
    <View style={styles.footer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Settings') {
              navigation.navigate(route.name, { user });
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.footerTab}
          >
            <Ionicons
              name={options.tabBarIcon}
              size={24}
              color={isFocused ? 'blue' : 'black'}
            />
            <Text style={styles.footerText}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = ({ route }) => {
  const { user } = route.params;

  console.log(`BottomTabNavigator says : ${user.picture}`)

  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} user={user}/>}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: 'home',
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          headerShown: false,
          tabBarIcon: 'chatbubble-ellipses',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: 'settings',
          // user: user,
        }}
        initialParams={{ user }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    height: 50,
  },
  footerTab: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});

export default BottomTabNavigator;
