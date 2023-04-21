import React, { useContext, useState, useEffect, useRef } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ChatContext } from '../src/ChatContext';

const ChatsScreen = () => {
  
  const { chats, setChats } = useContext(ChatContext);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const navigation = useNavigation();

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState("");

  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);

  const searchTimeoutRef = useRef(null);

  const filterChats = (text) => {
    setSearchText(text);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (text === '') {
        setFilteredChats(chats);
      } else {
        setFilteredChats(
          chats.filter((chat) =>
            chat.title.toLowerCase().includes(text.toLowerCase())
          )
        );
      }
    }, 500);
  };

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const storedChats = await AsyncStorage.getItem('chats');
      console.log('Stored chats:', storedChats); // добавьте эту строку
      if (storedChats !== null) {
        setChats(JSON.parse(storedChats));
        console.log('Чаты загружены');
      } else {
        console.log('No stored chats'); // добавьте эту строку
      }
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  };
  

  useEffect(() => {
    const updateChats = async () => {
      try {
        await AsyncStorage.setItem('chats', JSON.stringify(chats));
      } catch (error) {
        console.error('Error updating chats:', error);
      }
    };
  
    if (chats.length > 0) {
      updateChats();
    }
  }, [chats]);
  

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
    setNewChatTitle(selectedChat.title.replace("...", ""));
    setEditModalVisible(true);
    setMenuVisible(false);
  };
  

  const handleDelete = () => {
    console.log('Delete chat', selectedChat);
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== selectedChat.id));
    setMenuVisible(false);
  };

  const saveNewChatTitle = () => {
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === selectedChat.id) {
          return { ...chat, title: newChatTitle };
        }
        return chat;
      })
    );
    setEditModalVisible(false);
  };
  
  const cancelEditing = () => {
    setEditModalVisible(false);
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
          placeholder="О чем мы говорили?"
          onChangeText={(text) => filterChats(text)}
          value={searchText}
        />
      </View>
      
      {/* Список чатов */}
      <FlatList
        data={filteredChats}
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
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
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
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPress={() => setEditModalVisible(false)}
        >
          <View style={styles.editModalContainer}>
            <TextInput
              style={styles.editInput}
              value={newChatTitle}
              onChangeText={(text) => setNewChatTitle(text)}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                onPress={cancelEditing}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Отменить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveNewChatTitle}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Сохранить</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
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
    //backgroundColor: 'white',
    marginBottom: 8,
    //borderRadius: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
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
  editModalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  editInput: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
    width: '100%',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#240E54',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //width: '100%',
  },
  cancelButton: {
    backgroundColor: '#BDBDBD',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  cancelButtonText: {
    fontSize: 18,
    color: 'white',
  },
  
  
});

export default ChatsScreen;
