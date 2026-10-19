import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { BalanceCard } from '../../Components/Home/BalanceCard';
import { QuickActionButton } from '../../Components/Home/QuickAction';
import { BudgetCard } from '../../Components/Home/BudgetCard';
import { RecentActivityCard } from '../../Components/Home/RecentActivityCard';
import { Header } from '../../Components/Header';
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChartPie,
  CreditCard,
  EllipsisVertical,
  MoveUpRight,
  ShoppingBag,
  ShoppingCart,
  Wallet,
} from 'lucide-react-native';

export const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />
      {/* Dashboard Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <BalanceCard />
        </View>
        {/* quick buttons  */}
        <View style={styles.quickbtns}>
          <QuickActionButton
            icon={<ArrowUpRight size={20} color="#10b981" />}
            label={'Sent'}
          />
          <QuickActionButton
            icon={<ArrowDownLeft size={20} color="#10b981" />}
            label={'Receive'}
          />
          <QuickActionButton
            icon={<ChartPie size={20} color="#10b981" />}
            label={'Analytics'}
          />
          <QuickActionButton
            icon={<EllipsisVertical size={20} color="#10b981" />}
            label={'More'}
          />
        </View>
        {/* monthly budget card  */}
        <View style={{ marginTop: 10 }}>
          <BudgetCard />
        </View>
        {/* RecentActivity  */}
        <View
          style={{
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 6,
              paddingVertical: 5,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Recent Activity
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={{ color: '#10B981', fontWeight: 'bold' }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <RecentActivityCard
              icon={<CreditCard size={21} color={'#ffff'} />}
              title="Apple Store"
              type="Shopping"
              date="2026-10-08"
              expense="-$129.99"
            />

            <RecentActivityCard
              icon={<Wallet size={21} color={'#ffff'} />}
              title="TechCorp Salary"
              type="Income"
              date="2026-10-01"
              expense="+$4850.00"
            />

            <RecentActivityCard
              icon={<ShoppingCart size={21} color={'#ffff'} />}
              title="Organic Grocery Market"
              type="Food"
              date="2026-10-07"
              expense="-$84.50"
            />

            <RecentActivityCard
              icon={<CreditCard size={21} color={'#ffff'} />}
              title="Electric & Gas Utility"
              type="Bills"
              date="2026-10-05"
              expense="-$142.10"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 8,
    paddingBottom: 110,
  },

  balanceCard: {
    width: '100%',
    alignSelf: 'stretch',
  },
  quickbtns: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 5,
  },
});
