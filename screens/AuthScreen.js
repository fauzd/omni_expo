import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AuthScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать!</Text>
      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={() => {
          // Ваш код для авторизации через Google
        }}
      >
        <Text style={styles.buttonText}>Войти через Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.appleButton]}
        onPress={() => {
          // Ваш код для авторизации через Apple
        }}
      >
        <Text style={styles.buttonText}>Войти через Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.facebookButton]}
        onPress={() => {
          // Ваш код для авторизации через Facebook
        }}
      >
        <Text style={styles.buttonText}>Войти через Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  appleButton: {
    backgroundColor: '#000000',
  },
  facebookButton: {
    backgroundColor: '#1877F2',
  },
});

export default AuthScreen;
