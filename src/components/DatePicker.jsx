import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { Fonts } from '../constants/Fonts';

// 1. Create a reusable component for each date input field
const DateInputField = ({ label, value, onValueChange, placeholder }) => {
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (selectedDate) {
      onValueChange(selectedDate);
    }
  };

  const formatDate = (dateObj) => {
    if (!dateObj) return ; // Handle case where no date is set
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    });
  };

  return (
    <View style={styles.inputFlexItem}>
      {/* Label for each picker */}
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.inputContainer} onPress={() => setShow(true)}>
        <Icon name="calendar-outline" size={18} color="#8E99A6" style={styles.icon} />
        
        <TextInput
          style={styles.input}
          value={formatDate(value)}
          editable={false} // Read-only
          pointerEvents="none" // Standard technique for date pickers
          placeholder={placeholder}
          placeholderTextColor="#C0C8CF"
        />
      </Pressable>

      {show && (
        <DateTimePicker
          value={value || new Date()} 
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default function DateRangePicker() {
  const [startDate, setStartDate] = useState(new Date()); 
  const [endDate, setEndDate] = useState(new Date());

  return (
    <View style={styles.wrapper}>
      {/* Start Date Field */}
      <DateInputField
        label="START DATE"
        value={startDate}
        onValueChange={setStartDate}
        placeholder="Oct 01"
      />
      
      {/* End Date Field */}
      <DateInputField
        label="END DATE"
        value={endDate}
        onValueChange={setEndDate}
        placeholder="Dec 28"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row', 
    gap: 16, 
    paddingVertical:"3%",
    backgroundColor:colors.white, 
  },
  inputFlexItem: {
    flex: 1, 
  },
  label: {
    fontSize: typography.m,
    fontFamily:Fonts.SemiBold,
    color: colors.Dargrey,
    marginBottom: "4%" 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:colors.white,
    borderWidth: 1,
    borderColor:colors.OffWhite,
    borderRadius: 25, 
    paddingHorizontal: 16,
    height: 44,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1, 
    fontSize: typography.xl,
    fontFamily:Fonts.Regular,
    color: colors.Dargrey, 
    fontWeight: '500',
    padding: 0,
  },
});