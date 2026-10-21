import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Menu, User } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

export const Header = () => {
  // const insets = useSafeAreaInsets();
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const getgreetings = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 17) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  // drawer
  const openDrawer = () => {
    let parent = navigation;

    while (parent) {
      if (typeof parent.openDrawer === 'function') {
        parent.openDrawer();
        return;
      }

      parent = parent.getParent();
    }
  };
  // navigation
  const openProfile = () => {
    let currentNavigation = navigation;
    let homeNavigator = null;

    while (currentNavigation) {
      const routeNames = currentNavigation.getState?.()?.routeNames ?? [];

      // Profile is registered directly in this navigator
      if (routeNames.includes('Profile')) {
        currentNavigation.navigate('Profile');
        return;
      }

      // Remember a navigator that has the Home drawer route
      if (routeNames.includes('Home')) {
        homeNavigator = currentNavigation;
      }

      currentNavigation = currentNavigation.getParent?.();
    }

    // Profile is nested inside Home's Tab Navigator
    if (homeNavigator) {
      homeNavigator.navigate('Home', {
        screen: 'Profile',
      });
    } else {
      console.warn('Profile route was not found. Check TabNavigations.jsx.');
    }
  };
  // image load
 useFocusEffect(

  useCallback(() => {
    let isActive = true
    const loadImage = async () => {
  
      try {
        const savedImage = await AsyncStorage.getItem('profileImagePath');
        if (isActive) {
          setImage(savedImage);
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadImage()
    return () => {
      isActive=false
    }
  },[])

 )

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View>
          <TouchableOpacity onPress={openDrawer}>
            <Menu size={30} color={'#ffff'} />
          </TouchableOpacity>
        </View>
        {/* image  */}
        <TouchableOpacity onPress={openProfile}>
          <View style={styles.avatar}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholder}>
                <User size={30} color="#94A3B8" />
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View>
          <Text style={styles.welcome}>{getgreetings()}</Text>
          <Text style={styles.name}>Alex Morgan</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020617',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#1E293B',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10D6A0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  logo: {
    color: '#FFFFFF',
    backgroundColor: '#10B981',
    overflow: 'hidden',
    borderRadius: 50,
    padding: 10,
    fontWeight: 'bold',
  },

  welcome: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: 'bold',
  },

  name: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
