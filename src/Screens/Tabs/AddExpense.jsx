import React, { useState, useRef, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../../Components/Header';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

const categories = [
  { name: 'Food', color: '#F97316' },
  { name: 'Shopping', color: '#A855F7' },
  { name: 'Bills', color: '#3B82F6' },
  { name: 'Transport', color: '#F59E0B' },
  { name: 'Entertainment', color: '#F43F5E' },
  { name: 'Income', color: '#10B981' },
];

const validationSchema = Yup.object({
  amount: Yup.string()
    .required('Amount is required')
    .test('positive-amount', 'Enter a valid amount greater than 0', value => {
      if (!value || !/^\d+(\.\d{0,2})?$/.test(value)) return false;
      return Number(value) > 0;
    }),

  description: Yup.string()
    .trim()
    .required('Description is required')
    .max(100, 'Description must be 100 characters or fewer'),

  category: Yup.string().required('Please select a category'),
});

export const AddExpense = ({ navigation }) => {
  const [type, setType] = useState('Expense');
  const [successVisible, setSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const resetFormRef = useRef(null);

  const initialValues = {
    amount: '',
    description: '',
    category: 'Food',
  };
  // reset states
  useFocusEffect(
    useCallback(() => {
      // Runs when AddExpense receives focus.
      return () => {
        // Runs when the user leaves AddExpense.
        resetFormRef.current?.();
        setType('Expense');
        setSuccessVisible(false);
        setSuccessMessage('');
      };
    }, []),
  );

  const handleSave = (values, { resetForm }) => {
    const transaction = {
      id: Date.now().toString(),
      type,
      amount: Number(values.amount),
      description: values.description.trim(),
      category: values.category,
      date: new Date().toISOString(),
    };

    console.log('Transaction:', transaction);
    setSuccessVisible(true);
    setSuccessMessage(`${type} transaction details are ready.`);
    resetForm({
      amount: '',
      description: '',
      category: type === 'income' ? 'income' : 'Food',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            resetForm,
          }) => {
            // reset forms
            resetFormRef.current = () => {
              resetForm({
                values: {
                  amount: '',
                  description: '',
                  category: 'Food',
                },
                errors: {},
                touched: {},
              });
            };
            const visibleCategories =
              type === 'Income'
                ? categories.filter(item => item.name === 'Income')
                : categories.filter(item => item.name !== 'Income');

            const changeType = nextType => {
              setType(nextType);
              setFieldTouched('category', false);

              if (nextType === 'Income') {
                setFieldValue('category', 'Income');
              } else if (values.category === 'Income') {
                setFieldValue('category', 'Food');
              }
            };

            const saveTransaction = () => {
              handleSubmit();
            };

            return (
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
              >
                <Header />

                <Text style={styles.screenTitle}>Add New Transaction</Text>

                {/* Expense / Income */}
                <View style={styles.typeContainer}>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      type === 'Expense' && styles.expenseActive,
                    ]}
                    onPress={() => changeType('Expense')}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        type === 'Expense' && styles.activeText,
                      ]}
                    >
                      Expense
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      type === 'Income' && styles.incomeActive,
                    ]}
                    onPress={() => changeType('Income')}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        type === 'Income' && styles.activeText,
                      ]}
                    >
                      Income
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Amount */}
                <View style={styles.amountCard}>
                  <Text style={styles.currencySymbol}>$</Text>

                  <View style={styles.amountInputContainer}>
                    <Text style={styles.amountLabel}>AMOUNT ($)</Text>

                    <TextInput
                      style={styles.amountInput}
                      keyboardType="decimal-pad"
                      placeholder="0.00"
                      placeholderTextColor="#475569"
                      value={values.amount}
                      onChangeText={text => {
                        // Keep digits and at most one decimal point.
                        let numericText = text.replace(/[^0-9.]/g, '');
                        const decimalIndex = numericText.indexOf('.');

                        if (decimalIndex !== -1) {
                          numericText =
                            numericText.slice(0, decimalIndex + 1) +
                            numericText
                              .slice(decimalIndex + 1)
                              .replace(/\./g, '')
                              .slice(0, 2);
                        }

                        setFieldValue('amount', numericText);
                      }}
                      onBlur={handleBlur('amount')}
                      maxLength={12}
                    />
                  </View>
                </View>

                {touched.amount && errors.amount ? (
                  <Text style={styles.errorText}>{errors.amount}</Text>
                ) : null}

                {/* Description */}
                <View style={styles.descriptionContainer}>
                  <Text style={styles.fieldLabel}>DESCRIPTION / MERCHANT</Text>

                  <TextInput
                    style={styles.descriptionInput}
                    placeholder="e.g., Starbucks Coffee"
                    placeholderTextColor="#94A3B8"
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    maxLength={100}
                  />
                </View>

                {touched.description && errors.description ? (
                  <Text style={styles.errorText}>{errors.description}</Text>
                ) : null}

                {/* Categories */}
                <Text style={styles.categoryTitle}>CATEGORY</Text>

                <View style={styles.categoryGrid}>
                  {visibleCategories.map(item => {
                    const isSelected = values.category === item.name;

                    return (
                      <TouchableOpacity
                        key={item.name}
                        style={[
                          styles.categoryButton,
                          isSelected && {
                            borderColor: item.color,
                            backgroundColor: '#071A20',
                          },
                        ]}
                        onPress={() => {
                          setFieldValue('category', item.name);
                          setFieldTouched('category', true, false);
                        }}
                        activeOpacity={0.8}
                      >
                        <View
                          style={[
                            styles.categoryDot,
                            { backgroundColor: item.color },
                          ]}
                        />

                        <Text
                          style={[
                            styles.categoryText,
                            isSelected && {
                              color: item.color,
                              fontWeight: '700',
                            },
                          ]}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {touched.category && errors.category ? (
                  <Text style={styles.errorText}>{errors.category}</Text>
                ) : null}

                {/* Save */}
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={saveTransaction}
                  activeOpacity={0.8}
                >
                  <Text style={styles.saveButtonText}>Save Transaction</Text>
                </TouchableOpacity>
              </ScrollView>
            );
          }}
        </Formik>
        {/* pop up  */}
        {successVisible && (
          <View style={styles.successOverlay}>
            <View style={styles.successModal}>
              <View style={styles.successIcon}>
                <Icon name="check-circle" size={32} color="#10D6A0" />
              </View>

              <Text style={styles.successTitle}>Transaction Added</Text>

              <Text style={styles.successMessage}>{successMessage}</Text>

              <TouchableOpacity
                style={styles.successButton}
                onPress={() => {
                  setSuccessVisible(false);
                  navigation.navigate('Home');
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.successButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
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
    paddingHorizontal: 6,
    paddingBottom: 110,
  },

  screenTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 18,
  },

  typeContainer: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 13,
    padding: 4,
    marginBottom: 16,
  },

  typeButton: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },

  expenseActive: {
    backgroundColor: '#F43F5E',
  },

  incomeActive: {
    backgroundColor: '#10B981',
  },

  typeText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },

  activeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  amountCard: {
    minHeight: 90,
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 26,
    paddingVertical: 12,
    marginBottom: 8,
  },

  currencySymbol: {
    color: '#F8FAFC',
    fontSize: 32,
    fontWeight: '800',
  },

  amountInputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  amountLabel: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 3,
  },

  amountInput: {
    color: '#F8FAFC',
    fontSize: 29,
    fontWeight: '800',
    minWidth: 110,
    padding: 0,
    textAlign: 'center',
  },

  descriptionContainer: {
    marginTop: 12,
    marginBottom: 16,
  },

  fieldLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 7,
  },

  descriptionInput: {
    height: 39,
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    color: '#F8FAFC',
    fontSize: 12,
  },

  categoryTitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },

  categoryButton: {
    width: '32.5%',
    height: 54,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 5,
  },

  categoryText: {
    color: '#CBD5E1',
    fontSize: 11,
    textAlign: 'center',
  },

  errorText: {
    color: '#F43F5E',
    fontSize: 11,
    marginTop: 4,
    marginBottom: 4,
  },

  saveButton: {
    height: 42,
    backgroundColor: '#10B981',
    borderRadius: 12,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#10B981',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  saveButtonText: {
    color: '#020617',
    fontSize: 12,
    fontWeight: '700',
  },
  // pop up
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10000,
    elevation: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },

  successModal: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
  },

  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#052E2B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  successTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  successMessage: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 22,
  },

  successButton: {
    width: '100%',
    backgroundColor: '#10D6A0',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },

  successButtonText: {
    color: '#020617',
    fontSize: 14,
    fontWeight: '700',
  },
});
