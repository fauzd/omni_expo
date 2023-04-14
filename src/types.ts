import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Chat: undefined;
};

export type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;


export type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;