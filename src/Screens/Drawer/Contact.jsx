import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Header } from '../../Components/Header';

export const Contact = () => {
  return (
    <SafeAreaView>
      {/* header  */}
      <Header />
      <View>
        <Text>Contact</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
