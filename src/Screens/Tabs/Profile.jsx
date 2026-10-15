import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Header } from '../../Components/Header';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';

export const Profile = ({ navigation }) => {
  const [currency, setCurrency] = useState({
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
  });

  const [securityEnabled, setSecurityEnabled] = useState(true);
  const [currencyVisible, setCurrencyVisible] = useState(false);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  ];

  const handleExport = () => {
    Alert.alert(
      'Export Statements',
      'CSV statement export can be connected to your transaction data.',
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Header />

        <Text style={styles.heading}>Profile</Text>

        {/* Profile information */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AM</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Alex Morgan</Text>
            <Text style={styles.email}>alex.morgan@pockettrack.io</Text>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsCard}>
          {/* Currency */}
          <View style={styles.currencyRow}>
            <Text style={styles.currencyLabel}>Primary Currency</Text>

            <TouchableOpacity
              style={styles.currencyDropdown}
              onPress={() => {
                setCurrencyVisible(true);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.currencyValue}>
                {currency.code} ({currency.symbol})
              </Text>
              <Icon name="chevron-down" size={14} color="#CBD5E1" />
            </TouchableOpacity>
          </View>

          {/* Security */}
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setSecurityEnabled(previous => !previous)}
            activeOpacity={0.7}
          >
            <Text style={styles.settingLabel}>Security &amp; FaceID</Text>

            <View
              style={[
                styles.statusBadge,
                !securityEnabled && styles.disabledBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  !securityEnabled && styles.disabledText,
                ]}
              >
                {securityEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Export */}
          <TouchableOpacity
            style={[styles.settingRow, styles.lastRow]}
            onPress={handleExport}
            activeOpacity={0.7}
          >
            <Text style={styles.settingLabel}>Export Statements (CSV)</Text>
            <Feather name="download" size={17} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Currency Modal */}
      {currencyVisible && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            elevation: 20,
            backgroundColor: 'rgba(0,0,0,0.85)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: '#0F172A',
              padding: 24,
              borderRadius: 16,
            }}
          >
            <Text style={{ color: 'white', fontSize: 20, marginBottom: 16 }}>
              Select Currency
            </Text>

            {currencies.map(item => (
              <TouchableOpacity
                key={item.code}
                onPress={() => {
                  setCurrency(item);
                  setCurrencyVisible(false);
                  Toast.show({
                    type: 'success',
                    text1: 'Currency Updated',
                    text2: `${item.code} ${item.symbol} selected successfully.`,
                    position: 'top',
                    visibilityTime: 2500,
                    fontWeight: 'bold',
                    fontSize: 10,
                  });
                }}
                style={{ paddingVertical: 14 }}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>
                  {item.code} ({item.symbol}) — {item.name}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setCurrencyVisible(false)}
              style={{ marginTop: 12 }}
            >
              <Text style={{ color: '#10D6A0' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  screen: {
    flex: 1,
    paddingHorizontal: 14,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 14,
  },
  profileCard: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 17,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 82,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10D6A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#020617',
    fontSize: 14,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  email: {
    color: '#94A3B8',
    fontSize: 11,
  },
  settingsCard: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 2,
    borderRadius: 17,
    overflow: 'hidden',
  },
  settingRow: {
    minHeight: 48,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  settingLabel: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#052E2B',
    borderWidth: 1,
    borderColor: '#064E3B',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  statusText: {
    color: '#10D6A0',
    fontSize: 10,
    fontWeight: '500',
  },
  disabledBadge: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  disabledText: {
    color: '#94A3B8',
  },

  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: '#00172B',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 12,
  },

  currencyLabel: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },

  currencyDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: '#1E293B',
    borderRadius: 8,
  },

  currencyValue: {
    color: '#F8FAFC',
    fontSize: 11,
  },
});
