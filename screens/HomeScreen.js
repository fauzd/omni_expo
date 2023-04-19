import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTabBar from './CustomTabBar';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cardWidth = screenWidth * 0.4;
const cardHeight = screenHeight * 0.19;
const cardMargin = (screenWidth - 2 * cardWidth) / 6;


const HomeScreen = ({ navigation }) => {
  const cardData = [
    { title: 'Продолжи поговорку',
      subPrompt: 'Я тебе буду присылать первые части известных поговорок и крылатых выражений, а ты мне в ответ присылай продолжения. Если ты не знаешь ответа, то так и скажи прямо, что вопрос понял, но ответа не знаешь' },
    { title: 'Объясни',
      subPrompt: ''  },
    { title: 'Научи',
      subPrompt: '' },
    { title: 'Помоги решить',
      subPrompt: '' },
    { title: 'Поболтай',
      subPrompt: '' },
    { title: 'Проверь',
      subPrompt: '' },
    { title: 'Напиши текст',
      subPrompt: '' },
    { title: 'Расскажи шутку',
      subPrompt: '' },
    { title: 'Придумай',
      subPrompt: '' },
    { title: 'Переведи текст',
      subPrompt: '' },
    // ...и так далее
  ];
  

  const renderCards = () => {
    return cardData.map((data, index) => (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => {
          navigation.navigate('Chat', { chatData: data.subPrompt }); // Передайте subPrompt в качестве параметра
        }}
      >
        <Text style={styles.cardText}>{data.title}</Text>
      </TouchableOpacity>
    ));
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={32} color="black" />
        <Text style={styles.headerTitle}>Новый чат</Text>
        <Ionicons name="search" size={32} color="black" />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {renderCards()}
      </ScrollView>

      {/* <CustomTabBar navigation={navigation} activeScreen="NewChat" /> */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: screenHeight * 0.15 - statusBarHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  headerTitle: {
    fontFamily: "Alice",
    fontSize: 34,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 34,
    letterSpacing: -0.40799999237060547,
    textAlign: "center",
    color: "#240E54"
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    backgroundColor: '#FDF4E5'
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: '#FFFFFF',
    //borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    //marginLeft: cardMargin,
    //marginRight: cardMargin,
  },
  cardText: {
    fontFamily: "Alice",
    fontSize: 23,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 25.5,
    textAlign: "center",
    color: "#240E54"
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: 'white',
    paddingVertical: 8,
  },
  footerText: {
    fontSize: 12,
  },
  
});

export default HomeScreen;
