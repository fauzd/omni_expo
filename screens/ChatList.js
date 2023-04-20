import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomTabBar from './CustomTabBar';

import { ChatContext } from '../src/ChatContext';

const ChatsScreen = () => {
  
  const { chats } = useContext(ChatContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.chatItem}>
        <View style={styles.chatTitleAndDateContainer}>
          <Text style={styles.chatTitle}>{item.title}</Text>
          <Text style={styles.chatDate}>{item.date}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelectedChat(item);
            setMenuVisible(true);
          }}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handleRename = () => {
    console.log('Rename chat', selectedChat);
    setMenuVisible(false);
  };

  const handleDelete = () => {
    console.log('Delete chat', selectedChat);
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={32} color="black" />
        <Text style={styles.headerTitle}>Список чатов</Text>
        <Ionicons name="search" size={32} color="white" />
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => {
          setMenuVisible(!menuVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.menuContainer}>
            <TouchableOpacity
              onPress={handleRename}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>Переименовать</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF4E5',
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
    marginBottom: 16,
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
  chatTitleAndDateContainer: {
    justifyContent: 'flex-start',
  },
  chatTitle: {
    fontFamily: "Alice",
    fontSize: 23,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 25.5,
    textAlign: "center",
    color: "#240E54"
  },
  chatDate: {
    fontSize: 14,
    color: '#B0B0B0',
    textAlign: "left",
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItem: {
    paddingVertical: 8,
  },
  menuItemText: {
    fontSize: 18,
  },
});

export default ChatsScreen;
