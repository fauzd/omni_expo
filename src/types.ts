import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  Chat: undefined;
};

export type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;
