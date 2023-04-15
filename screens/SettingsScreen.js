import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CustomTabBar from './CustomTabBar';

const SettingsScreen = ({ navigation, route }) => {
  const { user } = route.params;
  console.log(`SettingsScreen says : ${user}`)

  if (!user) {
    return <Text>Loading...</Text>;
  }
  
  const settingsList = [
    { title: 'Учетная запись', iconName: 'account-circle' },
    { title: 'Чаты', iconName: 'forum' },
    { title: 'Внешний вид', iconName: 'palette' },
    { title: 'Уведомления', iconName: 'notifications' },
    { title: 'Конфиденциальность', iconName: 'privacy-tip' },
    // { title: 'Данные и хранилище', iconName: 'storage' },
    { title: 'Язык приложения', iconName: 'language' },
  ];

  const renderItem = (item) => (
    <TouchableOpacity style={styles.listItem} onPress={() => {}}>
      <MaterialIcons name={item.iconName} size={24} color="black" />
      <Text style={styles.listItemTitle}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Верхняя часть */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Настройки</Text>
      </View>

      {/* Основная часть */}
      <ScrollView>
        {/* Профиль пользователя */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user.picture }} 
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.given_name} {user.family_name}</Text>
            <Text style={styles.profileEmail}>email@example.com</Text>
          </View>
        </View>

        {/* Список настроек */}
        {settingsList.map((item) => renderItem(item))}

        {/* Разделитель */}
        {/* <View style={styles.divider} /> */}

        {/* Помощь и Пригласить друга */}
        <TouchableOpacity style={styles.listItem} onPress={() => {}}>
          <Text style={styles.listItemTitle}>Помощь</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem} onPress={() => {}}>
          <Text style={styles.listItemTitle}>Пригласить друга</Text>
        </TouchableOpacity>

        {/* Логотип */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://example.com/logo.png' }}
            style={styles.logo}
          />
        </View>
      </ScrollView>

      {/* Нижняя часть */}
      {/* <CustomTabBar navigation={navigation} activeScreen="NewChat" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemTitle: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  logo: {
    width: 100,
    height: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 8,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonActive: {
    borderTopWidth: 2,
    borderColor: 'black',
  },
  footerButtonText: {
    fontSize: 12,
  },
  });
  
  export default SettingsScreen;