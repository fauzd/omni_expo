import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTabBar from './CustomTabBar';

const HomeScreen = ({ navigation }) => {
  const cardData = [
    /* Здесь будет массив с данными для карточек */
  ];

  const renderCards = () => {
    return cardData.map((data, index) => (
      <TouchableOpacity
        key={index}
        style={styles.card}
        onPress={() => {
          /* Навигация на экран чата с передачей параметров */
        }}
      >
        <Text style={styles.cardText}>{data.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="black" />
        <Text style={styles.headerTitle}>Чат</Text>
        <Ionicons name="search" size={24} color="black" />
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
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '45%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  cardText: {
    fontSize: 16,
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
