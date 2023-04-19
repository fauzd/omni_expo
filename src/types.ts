import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Splash: undefined;
  Chat: { subPrompt: string };
  
};

export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;


export type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;