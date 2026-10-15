import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BudgetCard = ({
  percentage = 68,
  categories = [
    { name: 'Food', percentage: 36, color: '#F97316' },
    { name: 'Shopping', percentage: 21, color: '#A855F7' },
    { name: 'Bills', percentage: 11, color: '#3B82F6' },
  ],
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Budget Usage</Text>
        <Text style={styles.percentage}>{percentage}% Used</Text>
      </View>

      <View style={styles.progressTrack}>
        {categories.map(item => (
          <View
            key={item.name}
            style={{
              width: `${item.percentage}%`,
              backgroundColor: `${item.color}`,
              height: '100%',
            }}
          />
        ))}
      </View>

      <View style={styles.legend}>
        {categories.map(item => (
          <View key={item.name} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#0B1222',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#263247',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 13,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  percentage: {
    color: '#34D399',
    fontSize: 10,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#263247',
    marginBottom: 17,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: '#CBD5E1',
    fontSize: 10,
  },
});
