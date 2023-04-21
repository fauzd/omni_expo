import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMessage } from 'react-native-gifted-chat';

export interface Chat {
  id: string;
  title: string;
  date: string;
  messages: IMessage[];
}

interface ChatContextType {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const defaultChatContext: ChatContextType = {
  chats: [],
  setChats: () => {},
};

export const ChatContext = createContext<ChatContextType>(defaultChatContext);

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};
