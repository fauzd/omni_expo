import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomTabBar from './CustomTabBar';

const ChatsScreen = () => {
  // Временные данные для списка чатов
  const chats = [
    { id: '1', title: 'Чат 1', date: '01.01.2023' },
    { id: '2', title: 'Чат 2', date: '01.01.2023' },
    //...
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.chatItem}>
        <Text style={styles.chatTitle}>{item.title}</Text>
        <Text style={styles.chatDate}>{item.date}</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Верхняя часть */}
      <View style={styles.header}>
        <Ionicons name="menu" size={32} color="black" />
        <Text style={styles.headerTitle}>Список чатов</Text>
        <Ionicons name="search" size={32} color="black" />
      </View>
      
      {/* Поиск */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="О чем вы говорили"
        />
      </View>
      
      {/* Список чатов */}
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    {/* <CustomTabBar navigation={navigation} activeScreen="NewChat" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: 'white',
    marginBottom: 8,
    borderRadius: 8,
  },
  chatTitle: {
    fontSize: 18,
  },
  chatDate: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
    height: 60,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 12,
  },
});

export default ChatsScreen;
