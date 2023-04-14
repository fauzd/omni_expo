import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  { Svg, Path, Rect } from 'react-native-svg'; 
import commonStyles from './OnboardingStyles'

const OnboardingScreen3 = ({ navigation }) => {
  return (
    // <View style={commonStyles.container}>
    //   <View style={commonStyles.imageContainer}>
    //     <Svg
    //       width="353"
    //       height="373"
    //       viewBox="0 0 353 373" // Установите правильное значение в соответствии с размерами вашего SVG
    //       preserveAspectRatio="xMaxYMin meet"
    //     >
    //     <Rect width="436" height="373" rx="45" fill="#FFB2C6"/>
    //     </Svg>
    //   </View>
    //   <View style={commonStyles.textContainer}>
    //     <Text style={commonStyles.title}>Пользуйся всеми возможностями </Text>
    //     <Text style={commonStyles.subtitle}>Сохраняй диалоги и говори сколько хочешь без ограничения на длину ответа</Text>
    //     <Text style={commonStyles.text}>
    //       3/3
    //     </Text>
    //     <View style={commonStyles.buttonContainer}>
    //       <TouchableOpacity
    //         style={[commonStyles.button, commonStyles.skipButton]}
    //         onPress={() => navigation.navigate('Chat')}>
    //         <Text style={[commonStyles.buttonText, commonStyles.skipButtonText]}>Пропустить</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity
    //         style={[commonStyles.button, commonStyles.nextButton]}
    //         onPress={() => navigation.navigate('Chat')}>
    //         <Text style={[commonStyles.buttonText, commonStyles.nextButtonText]}>Далее</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>

    <View style={commonStyles.container}>

      <View style={commonStyles.imageContainer}>
        <Svg
          width="353"
          height="373"
          viewBox="0 0 353 373" // Установите правильное значение в соответствии с размерами вашего SVG
          preserveAspectRatio="xMaxYMin meet"
        >
        <Rect width="436" height="373" rx="45" fill="#FFB2C6"/>
        </Svg>
      </View>

      <View style={commonStyles.textContainer}>
        <View style={commonStyles.UpperTextContainer}>
          <Text style={commonStyles.title}>Пользуйся всеми возможностями</Text>
          <Text style={commonStyles.subtitle}>Сохраняй диалоги и говори сколько хочешь без ограничения на длину ответа</Text>
        </View>

        <View style={commonStyles.LowerTextContainer}>
          <Text style={commonStyles.text}>
            3/3
          </Text>
        </View>
      </View>   

      <View style={commonStyles.buttonContainer}>
        <TouchableOpacity
          style={[commonStyles.button, commonStyles.skipButton]}
          onPress={() => navigation.navigate('Auth')}>
          <Text style={[commonStyles.buttonText, commonStyles.skipButtonText]}>Пропустить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[commonStyles.button, commonStyles.nextButton]}
          onPress={() => navigation.navigate('Auth')}>
          <Text style={[commonStyles.buttonText, commonStyles.nextButtonText]}>Начать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  });

export default OnboardingScreen3;
