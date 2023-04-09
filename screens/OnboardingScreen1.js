import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  { Svg, Path, Rect } from 'react-native-svg'; 

const OnboardingScreen1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Svg
          width="353"
          height="373"
          viewBox="0 0 353 373" // Установите правильное значение в соответствии с размерами вашего SVG
          preserveAspectRatio="xMaxYMin meet"
        >
        <Rect width="436" height="373" rx="45" fill="#FDF4E5"/>
        <Path d="M103.776 158.796H127.761C130.756 158.793 133.627 157.605 135.744 155.493C137.862 153.38 139.053 150.516 139.056 147.529V112.009L152.187 107.745L146.356 65.799C146.163 63.8535 145.89 61.9017 145.549 60.0011C139.263 25.2317 108.965 0.00585938 73.5036 0.00585938C33.137 0.00585938 0.29541 32.766 0.29541 73.0341C0.29541 73.4207 0.299557 73.8175 0.307846 74.2247C0.337374 76.0478 0.433722 77.8679 0.592242 79.6383C0.924823 84.0038 1.49985 89.0716 2.1075 94.4355C3.30573 104.988 4.66247 116.95 4.66247 127.718V188.247H90.5647V171.969C90.5704 168.476 91.9644 165.128 94.441 162.659C96.9175 160.189 100.275 158.8 103.776 158.796Z" fill="#495BF5"/>
        </Svg>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Передовая технология</Text>
        <Text style={styles.subtitle}>ИИ-помощник для творчества, работы и отдыха</Text>
        <Text style={styles.text}>
          1/3
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={() => navigation.navigate('Chat')}>
            <Text style={[styles.buttonText, styles.skipButtonText]}>Пропустить</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={() => navigation.navigate('Onboarding2')}>
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

export default OnboardingScreen1;