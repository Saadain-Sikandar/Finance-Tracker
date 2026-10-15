import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

export const BalanceCard = ({
  balance = '$5,418.61',
  income = '+$5800',
  expenses = '-$381',
  walletType = 'USD Wallet',
}) => {
  return (
    <LinearGradient
      colors={['#0f9d76', '#115e51', '#0d2d34']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.labelText}>TOTAL BALANCE</Text>
          <Text style={styles.balanceText}>{balance}</Text>
        </View>

        {/* Wallet Pill Tag */}
        <TouchableOpacity style={styles.walletBadge} activeOpacity={0.8}>
          <Text style={styles.walletBadgeText}>{walletType}</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Divider Line */}
      <View style={styles.divider} />

      {/* Bottom Row: Income & Expenses */}
      <View style={styles.statsRow}>
        {/* Income Card */}
        <View style={styles.statCard}>
          <View style={styles.incomeIconBadge}>
            <Icon name="arrow-down-left" size={18} color="#2dd4bf" />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={styles.statAmount}>{income}</Text>
          </View>
        </View>

        {/* Expenses Card */}
        <View style={styles.statCard}>
          <View style={styles.expenseIconBadge}>
            <Icon name="arrow-up-right" size={18} color="#94a3b8" />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={styles.statAmount}>{expenses}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#1e4e45',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  labelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0d3830',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  balanceText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  walletBadge: {
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  walletBadgeText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  incomeIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(13, 148, 136, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  expenseIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  statTextContainer: {
    justifyContent: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 2,
  },
  statAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
