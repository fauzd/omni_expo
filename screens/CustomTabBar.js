import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomTabBar = ({ navigation, activeScreen }) => {
  return (
    <View style={styles.footer}>
      {/* Новый чат */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('NewChat');
        }}
      >
        <Ionicons
          name="chatbubble-ellipses"
          size={24}
          color={activeScreen === 'NewChat' ? 'blue' : 'black'}
        />
        <Text style={styles.footerText}>Новый чат</Text>
      </TouchableOpacity>

      {/* Список */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatsScreen');
        }}
      >
        <Ionicons
          name="list"
          size={24}
          color={activeScreen === 'ChatsScreen' ? 'blue' : 'black'}
        />
        <Text style={styles.footerText}>Список</Text>
      </TouchableOpacity>

      {/* Настройки */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SettingsScreen');
        }}
      >
        <Ionicons
          name="settings"
          size={24}
          color={activeScreen === 'SettingsScreen' ? 'blue' : 'black'}
        />
        <Text style={styles.footerText}>Настройки</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CustomTabBar;
