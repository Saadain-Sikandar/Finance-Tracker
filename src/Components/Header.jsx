import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Menu, User } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
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
      let isActive = true;
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
      loadImage();
      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <Menu size={26} color="#FFFFFF" />
        </TouchableOpacity>

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
                <User size={26} color="#94A3B8" />
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.greetingContainer}>
          <Text style={styles.welcome}>{getgreetings()}</Text>
          <Text style={styles.name} numberOfLines={1}>
            Alex Morgan
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020617',

    // Android: leave space for the status bar.
    // iOS: preserve your existing safe-area layout.
    paddingTop:
      Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 8 : 8,

    paddingHorizontal: 16,
    paddingBottom: 12,

    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  menuButton: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10D6A0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  profileImage: {
    width: '100%',
    height: '100%',
  },

  greetingContainer: {
    flex: 1,
    minWidth: 0,
  },

  welcome: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },

  name: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },

  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
