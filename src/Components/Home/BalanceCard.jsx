import { CreditCard, Wallet } from 'lucide-react-native';
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
      {/* <View style={styles.cardContainer}> */}
      <View style={styles.topRow}>
        <View style={styles.balanceInfo}>
          <Text style={styles.labelText}>TOTAL BALANCE</Text>
          <Text style={styles.balanceText} numberOfLines={1}>
            {balance}
          </Text>
        </View>

        <TouchableOpacity style={styles.walletBadge} activeOpacity={0.8}>
          <Text style={styles.walletBadgeText} numberOfLines={1}>
            {walletType}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={styles.incomeIconBadge}>
          <Wallet size={22} color={'#2dd4bf'} />
          </View>
          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={styles.statAmount} numberOfLines={1}>
              {income}
            </Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.expenseIconBadge}>
          <CreditCard size={22} color={'#2dd4bf'} />
          </View>
           

          <View style={styles.statTextContainer}>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={styles.statAmount} numberOfLines={1}>
              {expenses}
            </Text>
          </View>
        </View>
      </View>
      {/* </View> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    minHeight: 220,
    alignSelf: 'stretch',

    marginVertical: 15,

    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    overflow: 'hidden',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    marginVertical: 14,
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },

  balanceInfo: {
    flex: 1,
    minWidth: 0,
  },

  labelText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#d1fae5',
    letterSpacing: 0.8,
    marginBottom: 6,
  },

  balanceText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },

  walletBadge: {
    flexShrink: 0,
    maxWidth: 120,
    backgroundColor: 'rgba(15,23,42,0.35)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.20)',
  },

  walletBadgeText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.22)',
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal:10,
    gap: 12,
  },

  statCard: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 12,
    paddingHorizontal: 10,

    backgroundColor: 'rgba(15,23,42,0.35)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },

  incomeIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(13,148,136,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  expenseIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  statTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  statLabel: {
    fontSize: 11,
    color: '#cbd5e1',
    fontWeight: '500',
    marginBottom: 3,
  },

  statAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
});
