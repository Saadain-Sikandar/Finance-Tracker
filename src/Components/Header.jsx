import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

export const Header = () => {
  const insets = useSafeAreaInsets();
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
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.headerContent}>
        <View>
          <TouchableOpacity onPress={openDrawer}>
            <Icon name={'menu'} size={30} color={'#ffff'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Home', {
              Screen: 'Profile',
            })
          }
        >
          <Text style={styles.logo}>AM</Text>
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
