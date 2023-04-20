import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { GiftedChat, Bubble, IMessage, BubbleProps, Message  } from 'react-native-gifted-chat';
import { ChatScreenNavigationProp, ChatScreenRouteProp } from '../src/types'; // Импортируйте тип навигации
import axios from 'axios';

import UserContext, { User } from '../src/UserContext';
import { ChatContext } from '../src/ChatContext';
import { Chat } from '../src/ChatContext';


interface ChatScreenProps {
  navigation: ChatScreenNavigationProp;
}

const ChatScreen = ({ navigation, route }: { navigation: ChatScreenNavigationProp; route: ChatScreenRouteProp }) => {
  const user = useContext(UserContext);
  const { chats, setChats } = useContext(ChatContext);

  
  const { chatData: subPrompt } = route.params;
  console.log(subPrompt)

  const fetchGPTResponse = async (history: Array<{ role: string; content: string }>) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', // замените "gpt-3.5-turbo" на желаемую модель
        {
          model: "gpt-3.5-turbo",
          messages: history,
          temperature: 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
        },
      );

      const gptResponse = response.data.choices[0].message.content.trim();
      const tokens = response.data.usage;
            
      console.log('GPT response:', gptResponse);
      
      return { gptResponse, tokens };
    } catch (error) {
      if (error.response) {
        if (error.response.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          console.error(`Error 429: Rate limited. Retry after ${retryAfter} seconds.`);
        } else {
          console.error('Error fetching GPT response:', error.response.status, error.response.data);
        }
      } else {
        console.error('Error fetching GPT response:', error);
      }
    }
    
    return null;
  };

  // Добавляем полученную от домашнего экрана подсказку в переписку первым сообщением, тем самым задавая контекст
  const [conversationHistory, setConversationHistory] = useState([
    { role: 'user', content: subPrompt },
  ]);
  
  //Форматируем дату
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}.${month}.${year}`;
  };

  //Создаем новый чат 
  const createNewChat = (message: IMessage) => {
    const date = new Date(message.createdAt);
    const dateString = formatDate(date); // преобразуйте дату в строку здесь
  
    const newChat = {
      id: Math.random().toString(),
      title: message.text.slice(0, 20) + '...',
      date: dateString,
      messages: [message],
    };
  
    return newChat;
  };
  

  const handleSendMessage = async (message: IMessage) => {

    const chatIndex = chats.findIndex(
      (chat) => chat.title === message.text.slice(0, 20) + '...'
    );
    

    setMessages((previousMessages) => [
      ...previousMessages,
      message,
    ]);
  
    // Если история переписки содержит только сообщение subPrompt, добавьте введенное сообщение и отправьте обе записи
    if (conversationHistory.length === 1) {
      setConversationHistory((previousHistory) => [
        ...previousHistory,
        { role: 'user', content: message.text },
      ]);
  
      const { gptResponse, tokens } = await fetchGPTResponse([
        ...conversationHistory,
        { role: 'user', content: message.text },
      ]);
  
      const gptMessage: IMessage = {
        _id: Math.random().toString(),
        text: `${gptResponse}\n\nВсего токенов: ${tokens.total_tokens}, Запрос: ${tokens.prompt_tokens}, Ответ: ${tokens.completion_tokens}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'OMNI',
          //avatar: '../assets/images/logo w bgrnd.png',
        },
      };
  
      setMessages((previousMessages) => [
        ...previousMessages,
        gptMessage,
      ]);

    // Если чат не существует, создайте новый чат
    if (chatIndex === -1) {
      const newChat = createNewChat(message);
      setChats((previousChats) => [...previousChats, newChat]);
    } else {
      // Обновите текущий чат в chatList
      const updatedChatList = [...chats];
      updatedChatList[chatIndex].messages.push(message);
      setChats(updatedChatList);
    }
  
      // Добавьте новое сообщение ассистента в историю переписки
      setConversationHistory((previousHistory) => [
        ...previousHistory,
        { role: 'assistant', content: gptResponse },
      ]);
  
    } else {
      // Добавьте новое сообщение пользователя в историю переписки
      setConversationHistory((previousHistory) => [
        ...previousHistory,
        { role: 'user', content: message.text },
      ]);
  
      const { gptResponse, tokens } = await fetchGPTResponse([...conversationHistory, { role: 'user', content: message.text }]);
  
      const gptMessage: IMessage = {
        _id: Math.random().toString(),
        text: `${gptResponse}\n\nВсего токенов: ${tokens.total_tokens}, Запрос: ${tokens.prompt_tokens}, Ответ: ${tokens.completion_tokens}`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'OMNI',
          //avatar: '../assets/images/logo w bgrnd.png',
        },
      };
  
      setMessages((previousMessages) => [
        ...previousMessages,
        gptMessage,
      ]);
  
      // Добавьте новое сообщение ассистента в историю переписки
      setConversationHistory((previousHistory) => [
        ...previousHistory,
        { role: 'assistant', content: gptResponse },
      ]);
    }


  };
   
  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: props.currentMessage.isAnswer
              ? '#FDF4E5'
              : '#FFFFFF', // Используем цвет для ответов, если это ответ
          },
          right: {
            backgroundColor: '#FDF4E5', // Установите цвет пузырька для ваших сообщений
          },
        }}
        textStyle={{
          left: {
            color: '#240E54', // Установите цвет текста для ответов
          },
          right: {
            color: '#240E54', // Установите цвет текста для ваших сообщений
          },
        }}
      />
    );
  };

  const [messages, setMessages] = useState([]);

  function onSend(newMessages = []) {
    handleSendMessage(newMessages[0]);
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Загрузка...</Text>
      </View>
    );
  }
  
  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: 1,
        name: user.name,
        avatar: user.picture,
      }}
      renderBubble={renderBubble}
      inverted={false}
      showUserAvatar={true}
      listViewProps={{
        contentContainerStyle: {
          flexGrow: 1,
          justifyContent: 'flex-end',
          backgroundColor: '#CDE6EA',
        },
      }}
    />
  );
  
};

export default ChatScreen;