import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  { Svg, Path, Rect } from 'react-native-svg'; 
import commonStyles from './OnboardingStyles'
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const originalWidth = 353;
const originalHeight = 373;

const scaleFactor = screenWidth / originalWidth;


const OnboardingScreen1 = ({ navigation }) => {
  return (
    <View style={commonStyles.container}>

      <View style={commonStyles.imageContainer}>
        <Svg
          width={screenWidth * 0.92}
          height={originalHeight * scaleFactor }
          viewBox="0 0 353 373" // Установите правильное значение в соответствии с размерами вашего SVG
          preserveAspectRatio="xMinYMin meet"
        >
        <Rect width="436" height="373" rx="45" fill="#FDF4E5"/>
        <Path d="M103.776 158.796H127.761C130.756 158.793 133.627 157.605 135.744 155.493C137.862 153.38 139.053 150.516 139.056 147.529V112.009L152.187 107.745L146.356 65.799C146.163 63.8535 145.89 61.9017 145.549 60.0011C139.263 25.2317 108.965 0.00585938 73.5036 0.00585938C33.137 0.00585938 0.29541 32.766 0.29541 73.0341C0.29541 73.4207 0.299557 73.8175 0.307846 74.2247C0.337374 76.0478 0.433722 77.8679 0.592242 79.6383C0.924823 84.0038 1.49985 89.0716 2.1075 94.4355C3.30573 104.988 4.66247 116.95 4.66247 127.718V188.247H90.5647V171.969C90.5704 168.476 91.9644 165.128 94.441 162.659C96.9175 160.189 100.275 158.8 103.776 158.796Z" fill="#495BF5"/>
        </Svg>
      </View>

      <View style={commonStyles.textContainer}>
        <View style={commonStyles.UpperTextContainer}>
          <Text style={commonStyles.title}>Передовая технология</Text>
          <Text style={commonStyles.subtitle}>ИИ-помощник для творчества, работы и отдыха</Text>
        </View>

        <View style={commonStyles.LowerTextContainer}>
          <Text style={commonStyles.text}>
            1/3
          </Text>
        </View>
      </View>   

      <View style={commonStyles.buttonContainer}>
        <TouchableOpacity
          style={[commonStyles.button, commonStyles.skipButton]}
          onPress={() => navigation.navigate('Chat')}>
          <Text style={[commonStyles.buttonText, commonStyles.skipButtonText]}>Пропустить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[commonStyles.button, commonStyles.nextButton]}
          onPress={() => navigation.navigate('Onboarding2')}>
          <Text style={[commonStyles.buttonText, commonStyles.nextButtonText]}>Дальше</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  });

export default OnboardingScreen1;