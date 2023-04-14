import React, { useState } from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import jwt_decode from 'jwt-decode';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

const AuthScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      '166635504701-rtj96vonuvc5oa2s3apdkq3m825gdgb7.apps.googleusercontent.com',
  });

  const [user, setUser] = useState(null);

 const validateAndDecodeIdToken = async (idToken) => {
  try {
    console.log('Calling jwt_decode with ID token:', idToken);
    const decodedToken = jwt_decode(idToken);
    console.log('jwt_decode result:', decodedToken);

    if (decodedToken) {
      setUser(decodedToken);
      console.log('User info:', decodedToken);
      return decodedToken;
    } else {
      console.error('jwt_decode returned an undefined result');
      return null;
    }
  } catch (error) {
    console.error('Invalid ID token:', error);
    return null;
  }
};

  React.useEffect(() => {
    if (response?.type === 'success') {

      console.log('Received successful Google response:', response);
      const { id_token } = response.params;
      console.log('Calling validateAndDecodeIdToken with ID token:', id_token);

      validateAndDecodeIdToken(id_token).then((decodedToken) => {
        console.log('validateAndDecodeIdToken result:', decodedToken);
        if (decodedToken) {
          console.log('Navigating to ChatScreen with user:', decodedToken);
          navigation.reset({ index: 0, routes: [{ name: 'Chat', params: { user: decodedToken } }] });
        }
      });
    }
  }, [response, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in to Omni</Text>
      <Text style={styles.subtitle}>Welcome back! Sign in using your social account or email to continue us</Text>
      <TouchableOpacity
        style={[styles.button, styles.googleButton]}
        onPress={() => {
          promptAsync();
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    // width: 358,
    // height: 34,
    fontFamily: "Alice",
    fontSize: 34,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 34,
    letterSpacing: -0.40799999237060547,
    textAlign: "center",
    color: "#240E54",
    marginTop: 165,
    marginBottom: 32,
  },
  subtitle:{
    width: 293,
    height: 40,
    //fontFamily: "SF Pro Text",
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0.10000000149011612,
    textAlign: "center",
    color: "#240E54",
    marginBottom: 40,
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
