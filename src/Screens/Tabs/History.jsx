import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { Header } from '../../Components/Header';
import { RecentActivityCard } from '../../Components/Home/RecentActivityCard';

const initialTransactions = [
  {
    id: '1',
    title: 'Apple Store',
    type: 'Shopping',
    date: '2026-10-08',
    expense: '-$129.99',
    iconname: 'credit-card',
  },
  {
    id: '2',
    title: 'TechCorp Salary',
    type: 'Income',
    date: '2026-10-01',
    expense: '+$4850.00',
    iconname: 'arrow-down-right',
  },
  {
    id: '3',
    title: 'Organic Grocery Market',
    type: 'Food',
    date: '2026-10-07',
    expense: '-$84.50',
    iconname: 'credit-card',
  },
  {
    id: '4',
    title: 'Electric & Gas Utility',
    type: 'Bills',
    date: '2026-10-05',
    expense: '-$142.10',
    iconname: 'credit-card',
  },
  {
    id: '5',
    title: 'Freelance Design Project',
    type: 'Income',
    date: '2026-10-04',
    expense: '+$950.00',
    iconname: 'arrow-down-right',
  },
  {
    id: '6',
    title: 'Uber Ride',
    type: 'Transport',
    date: '2026-10-03',
    expense: '-$24.80',
    iconname: 'credit-card',
  },
];

const categories = ['All', 'Food', 'Shopping', 'Bills', 'Transport', 'Income'];

export const History = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filterResults = transactions.filter(item => {
    const categorymatch =
      selectedCategory === 'All' ||
      item.type.toLowerCase() === selectedCategory.toLowerCase();
    const searchresult =
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase());

    return categorymatch && searchresult;
  });

  const confirmDelete = id => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () =>
            setTransactions(current =>
              current.filter(transaction => transaction.id !== id),
            ),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header />

        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Transaction History</Text>
          <Text style={styles.itemCount}>{filterResults.length} items</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="#FFFFFF" />

          <TextInput
            style={styles.searchInput}
            placeholder="Search by store or note"
            placeholderTextColor="#FFFFFF"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon name="x" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map(category => {
            const active = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  active && styles.activeCategoryButton,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    active && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Transaction cards */}
        <View style={styles.transactionList}>
          {filterResults.length > 0 ? (
            filterResults.map(item => {
              return (
                <RecentActivityCard
                  key={item.id}
                  iconname={item.iconname}
                  title={item.title}
                  type={item.type}
                  date={item.date}
                  expense={item.expense}
                  showDelete={true}
                  onDelete={() => confirmDelete(item.id)}
                />
              );
            })
          ) : (
            <Text style={styles.emptyText}>No transactions found.</Text>
          )}
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

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 12,
  },

  heading: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },

  itemCount: {
    color: '#94A3B8',
    fontSize: 12,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#263247',
    borderWidth: 1,
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    height: 44,
  },

  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontSize: 13,
  },

  categoryScroll: {
    marginTop: 15,
    marginBottom: 14,
    flexGrow: 0,
  },

  categoryContainer: {
    alignItems: 'center',
    paddingRight: 4,
  },

  categoryButton: {
    backgroundColor: '#0F172A',
    borderColor: '#263247',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
  },

  activeCategoryButton: {
    backgroundColor: '#10D6A0',
    borderColor: '#10D6A0',
  },

  categoryText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },

  activeCategoryText: {
    color: '#020617',
  },

  transactionList: {
    marginTop: 10,
  },

  emptyText: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 35,
    fontSize: 14,
  },
});
