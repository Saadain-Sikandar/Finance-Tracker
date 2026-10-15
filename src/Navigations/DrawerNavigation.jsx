import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AboutUS } from '../Screens/Drawer/AboutUS';
import { Contact } from '../Screens/Drawer/Contact';
import { TabNavigation } from './TabNavigations';
import Icon from 'react-native-vector-icons/Feather';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  // header
  const CustomDrawerHeader = () => {
    return (
      <View style={styles.drawerHeader}>
        <View>
          <Image
            style={styles.logoContainer}
            source={require('../assets/App_icon.webp')}
          />
        </View>
        <Text style={styles.appName}>Finance Tracker</Text>
        <Text style={styles.subtitle}>Manage your money</Text>
      </View>
    );
  };
  /* Log out */
  const Logoutbutton = ({ navigation }) => {
    const handleLogout = () => {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            const parentNavigation = navigation.getParent();
            if (parentNavigation) {
              parentNavigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } else {
              navigation.navigate('Login');
            }
          },
        },
      ]);
    };
    return (
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Icon name="log-out" size={17} color="#F43F5E" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    );
  };
  // screens
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          <CustomDrawerHeader />
          {/* items  */}
          <DrawerItemList {...props} />
          <Logoutbutton navigation={props.navigation} />
        </DrawerContentScrollView>
      )}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#0F172A',
          width: 250,
        },
        drawerActiveTintColor: '#10D6A0',
        drawerInactiveTintColor: '#94A3B8',
        drawerActiveBackgroundColor: '#1E293B',
      }}
    >
      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Icon name={'home'} size={20} color={color} />
          ),
        }}
        name="Home"
        component={TabNavigation}
      />

      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Icon name={'info'} size={20} color={color} />
          ),
        }}
        name="About"
        component={AboutUS}
      />

      <Drawer.Screen
        options={{
          drawerIcon: ({ color }) => (
            <Icon name={'phone'} size={20} color={color} />
          ),
        }}
        name="Contact"
        component={Contact}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  drawerHeader: {
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    marginBottom: 12,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 13,
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 16,
    height: 43,
    borderRadius: 13,
    backgroundColor: '#190B18',
    borderWidth: 1,
    borderColor: '#7F1D3D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logoutText: {
    color: '#F43F5E',
    fontSize: 12,
    fontWeight: '700',
  },
});
