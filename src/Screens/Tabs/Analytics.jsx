import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { Header } from '../../Components/Header';
import { BarChart } from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/Feather';
import { HealthScore } from '../../Components/Analytics/HealthScore';
import { Award, Check, ChevronDown } from 'lucide-react-native';

export const Analytics = () => {
  const weeklyData = [
    { value: 60, label: 'Mon', frontColor: '#10B981', spacing: 2 },
    { value: 30, frontColor: '#F43F5E', spacing: 8 },

    { value: 40, label: 'Tue', frontColor: '#10B981', spacing: 2 },
    { value: 80, frontColor: '#F43F5E', spacing: 8 },

    { value: 80, label: 'Wed', frontColor: '#10B981', spacing: 2 },
    { value: 45, frontColor: '#F43F5E', spacing: 8 },

    { value: 30, label: 'Thu', frontColor: '#10B981', spacing: 2 },
    { value: 20, frontColor: '#F43F5E', spacing: 8 },

    { value: 90, label: 'Fri', frontColor: '#10B981', spacing: 2 },
    { value: 60, frontColor: '#F43F5E', spacing: 8 },

    { value: 25, label: 'Sat', frontColor: '#10B981', spacing: 2 },
    { value: 90, frontColor: '#F43F5E', spacing: 8 },

    { value: 15, label: 'Sun', frontColor: '#10B981', spacing: 2 },
    { value: 20, frontColor: '#F43F5E' },
  ];
  const yearlyData = [
    { value: 65, label: 'Jan', frontColor: '#10B981', spacing: 2 },
    { value: 40, frontColor: '#F43F5E', spacing: 8 },

    { value: 75, label: 'Feb', frontColor: '#10B981', spacing: 2 },
    { value: 50, frontColor: '#F43F5E', spacing: 8 },

    { value: 55, label: 'Mar', frontColor: '#10B981', spacing: 2 },
    { value: 35, frontColor: '#F43F5E', spacing: 8 },

    { value: 85, label: 'Apr', frontColor: '#10B981', spacing: 2 },
    { value: 60, frontColor: '#F43F5E', spacing: 8 },

    { value: 70, label: 'May', frontColor: '#10B981', spacing: 2 },
    { value: 45, frontColor: '#F43F5E', spacing: 8 },

    { value: 90, label: 'Jun', frontColor: '#10B981', spacing: 2 },
    { value: 55, frontColor: '#F43F5E', spacing: 8 },

    { value: 80, label: 'Jul', frontColor: '#10B981', spacing: 2 },
    { value: 65, frontColor: '#F43F5E', spacing: 8 },

    { value: 60, label: 'Aug', frontColor: '#10B981', spacing: 2 },
    { value: 40, frontColor: '#F43F5E', spacing: 8 },

    { value: 75, label: 'Sep', frontColor: '#10B981', spacing: 2 },
    { value: 50, frontColor: '#F43F5E', spacing: 8 },

    { value: 95, label: 'Oct', frontColor: '#10B981', spacing: 2 },
    { value: 70, frontColor: '#F43F5E', spacing: 8 },

    { value: 70, label: 'Nov', frontColor: '#10B981', spacing: 2 },
    { value: 45, frontColor: '#F43F5E', spacing: 8 },

    { value: 88, label: 'Dec', frontColor: '#10B981', spacing: 2 },
    { value: 60, frontColor: '#F43F5E' },
  ];
  const [selectedType, setSelectedType] = useState('Both');
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');
  // dropdown
  const [dropDownvisible, setDropDownVisible] = useState(false);
  const filterOptions = ['Both', 'Income', 'Expense'];
  const [periodDropDown, setPeriodDropDown] = useState(false);
  const periods = ['Weekly', 'yearly'];
  const sourceData = selectedPeriod === 'Weekly' ? weeklyData : yearlyData;

  const chartData = sourceData.reduce((result, item, index, array) => {
    if (index % 2 !== 0) return result;

    const income = array[index];
    const expense = array[index + 1];
    const label = income.label;

    if (selectedType === 'Income') {
      result.push({
        ...income,
        label,
        spacing: 12,
      });
    } else if (selectedType === 'Expense') {
      result.push({
        ...expense,
        label,
        spacing: 12,
      });
    } else {
      result.push(
        { ...income, label, spacing: 2 },
        { ...expense, label: '', spacing: 8 },
      );
    }

    return result;
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* header  */}
      <View>
        <Header />
        <Text>Analytics</Text>
      </View>
      {/* Healthcscore card  */}
      <View style={styles.healthCard}>
        <View>
          <Text style={styles.healthLabel}>Health Score</Text>
          <Text style={styles.healthScore}>
            85/100 <Award color={'green'} size={20} />{' '}
          </Text>
          <Text style={styles.subtitle}>
            Excellent Saving ratio this month!
          </Text>
        </View>
        <View>
          {/* score  */}
          <HealthScore />
        </View>
      </View>
      {/* chart   */}

      <View style={styles.card}>
        <Text style={styles.title}>Weekly/Yearly Breakdown</Text>
        <View style={styles.DropDownContainer}>
          {/* dropdown  */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={styles.filterDropdown}
              onPress={() => setDropDownVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.filterDropdownText}>{selectedType}</Text>

              <ChevronDown size={20} color="#10D6A0" />
            </TouchableOpacity>
          </View>
          {/* dropdown modal  */}
          <Modal
            visible={dropDownvisible}
            transparent
            animationType="fade"
            onRequestClose={() => setDropDownVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setDropDownVisible(false)}
            >
              <View style={styles.dropdownMenu}>
                {filterOptions.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.dropdownItem,
                      selectedType === type && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      setSelectedType(type);
                      setDropDownVisible(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedType === type && styles.dropdownItemTextActive,
                      ]}
                    >
                      {type}
                    </Text>

                    {selectedType === type && (
                      <Check size={18} color="#10D6A0" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>
          {/* periods dropdown  */}
          {/* Period dropdown */}
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={styles.filterDropdown}
              onPress={() => setPeriodDropDown(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.filterDropdownText}>{selectedPeriod}</Text>

              <ChevronDown size={20} color="#10D6A0" />
            </TouchableOpacity>
          </View>

          {/* Dropdown modal */}
          <Modal
            visible={periodDropDown}
            animationType="fade"
            transparent
            onRequestClose={() => setPeriodDropDown(false)}
          >
            <View style={styles.modalOverlay}>
              {/* Close when the background is pressed */}
              <Pressable
                style={StyleSheet.absoluteFillObject}
                onPress={() => setPeriodDropDown(false)}
              />

              <View style={styles.dropdownMenu}>
                {periods.map(period => (
                  <TouchableOpacity
                    key={period}
                    style={[
                      styles.dropdownItem,
                      selectedPeriod === period && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      setSelectedPeriod(period);
                      setPeriodDropDown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedPeriod === period &&
                          styles.dropdownItemTextActive,
                      ]}
                    >
                      {period}
                    </Text>

                    {selectedPeriod === period && (
                      <Check size={18} color="#10D6A0" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>
        {/* chart  */}

        <View style={styles.chart}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chartScrollContent}
          >
            <BarChart
              data={chartData}
              barWidth={selectedPeriod === 'Yearly' ? 12 : 14}
              spacing={selectedPeriod === 'Yearly' ? 8 : 12}
              roundedTop
              height={170}
              width={selectedPeriod === 'Yearly' ? 520 : 330}
              maxValue={100}
              noOfSections={4}
              hideRules={false}
              rulesColor="#1E293B"
              yAxisTextStyle={styles.yAxisLabel}
              xAxisLabelTextStyle={styles.dayLabel}
              xAxisLabelsHeight={45}
              xAxisLabelsVerticalShift={12}
              yAxisThickness={1}
              xAxisThickness={2}
              xAxisColor="#334155"
              yAxisColor="#334155"
              initialSpacing={10}
              endSpacing={10}
              isAnimated
            />
          </ScrollView>
        </View>

        <View style={styles.divider} />

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={styles.incomeDot} />
            <TouchableOpacity onPress={() => setSelectedType('Income')}>
              <Text style={styles.legendText}>Income</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.legendItem}>
            <View style={styles.expenseDot} />
            <TouchableOpacity onPress={() => setSelectedType('Expense')}>
              <Text style={styles.legendText}>Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Emergency Fund  */}
      <View style={styles.fundCard}>
        <View style={styles.fundHeader}>
          <Text style={styles.fundTitle}>Emergency Fund Goal</Text>
          <Text style={styles.fundAmount}>$4,000 / $5,000</Text>
        </View>

        <View style={styles.progressBackground}>
          <View style={styles.progressFill} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  healthCard: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthLabel: {
    fontSize: 20,
    color: '#94A3B8',
    fontWeight: 'bold',
  },
  healthScore: {
    color: '#10D6A0',
    fontSize: 25,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 6,
  },

  card: {
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 2,
    borderRadius: 18,
    padding: 16,
    marginVertical: 12,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  chart: {
    marginTop: 20,
    width: '100%',
    minHeight: 250,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 25,
  },

  chartScrollContent: {
    paddingRight: 10,
    alignItems: 'center',
  },

  dayLabel: {
    color: '#CBD5E1',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    width: 35,
    marginTop: 8,
  },

  yAxisLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'right',
  },

  divider: {
    height: 1,
    backgroundColor: '#263247',
    marginTop: 12,
    marginBottom: 12,
  },

  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  incomeDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },

  expenseDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#F43F5E',
  },

  legendText: {
    color: '#94A3B8',
    fontSize: 15,
  },
  fundCard: {
    backgroundColor: '#020617',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginVertical: 8,
  },

  fundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  fundTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  fundAmount: {
    color: '#10D6A0',
    fontSize: 13,
    fontWeight: 'bold',
  },

  progressBackground: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressFill: {
    width: '80%',
    height: '100%',
    backgroundColor: '#10D6A0',
  },
  // dropdown
  DropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 12,
  },

  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 140,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
  },

  filterDropdownText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownMenu: {
    width: 220,
    padding: 8,
    backgroundColor: '#0F172A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    elevation: 8,
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  dropdownItemActive: {
    backgroundColor: '#1E293B',
  },

  dropdownItemText: {
    color: '#CBD5E1',
    fontSize: 15,
  },

  dropdownItemTextActive: {
    color: '#10D6A0',
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginTop: 20,
  },
  filterButton: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 4,
    borderColor: '#1E293B',
  },
  activeFilter: {
    backgroundColor: '#10D6A0',
    borderColor: '#10D6A0',
  },
  filterText: {
    fontSize: 15,
    color: '#ffff',
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: 'black',
  },
  activeExpense: {
    backgroundColor: '#F43F5E',
  },
});
