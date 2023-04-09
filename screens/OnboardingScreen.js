import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: '1',
    title: 'Передовая технология',
    text: 'ИИ-помощник для творчества, работы и отдыха',
    image: require('../assets/images/onboarding/img_01.svg'), // Если хочешь добавить картинки
  },
  {
    key: '2',
    title: 'Общайся, изучай и вдохновляйся ',
    text: 'Выбирай подходящую тему для разговора с ИИ-помощником ',
    image: require('../assets/images/onboarding/img_02.svg'),
  },
  {
    key: '3',
    title: 'Пользуйся всеми возможностями',
    text: 'Сохраняй диалоги и говори сколько хочешь без ограничения на длину ответа',
    image: require('../assets/images/onboarding/img_03.svg'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  const onDone = () => {
    navigation.navigate('Splash');
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onDone}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginTop: 16,
  },
  text: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 64,
    marginTop: 16,
  },
});

export default OnboardingScreen;
