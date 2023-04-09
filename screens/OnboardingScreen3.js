import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  { Svg, Path, Rect } from 'react-native-svg'; 

const OnboardingScreen3 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Svg
          width="353"
          height="373"
          viewBox="0 0 353 373" // Установите правильное значение в соответствии с размерами вашего SVG
          preserveAspectRatio="xMaxYMin meet"
        >
        <Rect width="436" height="373" rx="45" fill="#FFB2C6"/>
        </Svg>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Пользуйся всеми возможностями </Text>
        <Text style={styles.subtitle}>Сохраняй диалоги и говори сколько хочешь без ограничения на длину ответа</Text>
        <Text style={styles.text}>
          3/3
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={() => navigation.navigate('Chat')}>
            <Text style={[styles.buttonText, styles.skipButtonText]}>Пропустить</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={() => navigation.navigate('Chat')}>
            <Text style={[styles.buttonText, styles.nextButtonText]}>Далее</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: 78,
    paddingRight: 0,
  },
  textContainer: {
    flex: 1,
    width:'100%',
    paddingHorizontal: 35,
  },
  title: {
    fontFamily: 'Alice',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 34,
    lineHeight: 34,
    textAlign: 'left',
    letterSpacing: -0.408,
    color: '#240E54',
    marginTop: 22,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Alice',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 29,
    textAlign: 'left',
    letterSpacing: -0.408,
    color: '#240E54',
    marginTop: 22,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Alice',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 29,
    textAlign: 'left',
    letterSpacing: -0.408,
    color: '#240E54',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingVertical: 16,
    marginBottom: 70,
  },
  button: {
    width: 159,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#240E54',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontFamily: 'SF Pro text',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
  },
  skipButton: {
    backgroundColor: '#FFFFFF',
  },
  skipButtonText: {
    color: '#240E54',
  },
  nextButton: {
    backgroundColor: '#240E54',
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
  });

export default OnboardingScreen3;
