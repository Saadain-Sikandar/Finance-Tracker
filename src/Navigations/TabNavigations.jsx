import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

import { Home } from '../Screens/Tabs/Home';
import { History } from '../Screens/Tabs/History';
import { Analytics } from '../Screens/Tabs/Analytics';
import { Profile } from '../Screens/Tabs/Profile';
import { AddExpense } from '../Screens/Tabs/AddExpense';
import { useNavigation } from '@react-navigation/native';
import { ChartPie, House, ListClock, Plus, User} from 'lucide-react-native'

const Tab = createBottomTabNavigator();
const CenterButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.centerButton}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <Plus name="plus" size={30} color="#020617" />
  </TouchableOpacity>
);
export const TabNavigation = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#10D6A0',
        tabBarInactiveTintColor: '#94A3B8',

        tabBarStyle: {
          position: 'absolute',
          left: 6,
          right: 6,
          bottom: insets.bottom > 0 ? insets.bottom : 6,
          height: 65,
          backgroundColor: '#0F172A',
          borderTopWidth: 0,
          borderRadius: 24,
          elevation: 0,
          paddingTop: 8,
          paddingBottom: 5,
          paddingHorizontal: 3,
          marginHorizontal: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <House color={color} size={19}  />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <ListClock size={19} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddExpense}
        options={{
          tabBarLabel: () => null,
          tabBarButton: props => (
            <View style={styles.addButtonWrapper}>
              <CenterButton onPress={props.onPress} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={Analytics}
        options={{
          tabBarIcon: ({ color }) => (
            <ChartPie size={19} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <User size={19} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  centerButton: {
    position: 'absolute',
    top: -16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10D6A0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#10D6A0',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});
