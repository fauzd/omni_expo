import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
  Chat: { 
    chatId: string;
    subPrompt: string 
    chatData: string;
  };
  
};

export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
export type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;