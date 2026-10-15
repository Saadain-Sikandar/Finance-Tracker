import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { Header } from '../../Components/Header';

export const AboutUS = () => {
  return (
    <SafeAreaView>
      {/* header  */}
      <Header />
      <View>
        <Text>AboutUS</Text>
      </View>
    </SafeAreaView>
  );
};
