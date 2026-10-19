import { Trash } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const RecentActivityCard = ({
  icon,
  title,
  type,
  date,
  expense,
  showDelete = false,
  onDelete,
}) => {
  const getTypeColor = () => {
    switch (type?.toLowerCase()) {
      case 'shopping':
        return '#A855F7';

      case 'income':
        return '#10B981';

      case 'food':
        return '#F97316';

      case 'bills':
        return '#3B82F6';

      case 'transport':
        return '#F59E0B';

      default:
        return '#64748B';
    }
  };

  const isIncome = type?.toLowerCase() === 'income';

  return (
    <View style={styles.card}>
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: getTypeColor() }]}>
        {icon}
      </View>

      {/* Transaction details */}
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {type} • {date}
        </Text>
      </View>

      {/* Amount */}
      <Text style={[styles.amount, isIncome && styles.incomeAmount]}>
        {expense}
      </Text>
      {/* delete  */}
      {showDelete && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
          activeOpacity={0.7}
        >
          <Trash size={15} color="#64748B" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B1222',
    borderWidth: 1,
    borderColor: '#263247',
    borderRadius: 14,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    minHeight: 80,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  details: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },

  title: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
    textTransform: 'capitalize',
  },

  amount: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '700',
  },

  incomeAmount: {
    color: '#10B981',
  },
  deleteButton: {
    padding: 2,
    marginLeft: 4,
  },
});
