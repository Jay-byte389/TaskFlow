import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Fonts } from '../constants/Fonts';
import { typography } from '../constants/typography';

const TabSwitcher = ({
  tabs = [], // Array of tab strings passed from parent screen
  activeTab, // Currently active tab name
  onTabChange, // Callback function when a tab is pressed
  style,
  pillstyle,
  inactivepill
}) => {
  return (
    <View style={[styles.container,style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[
                styles.pill,pillstyle,
                isActive ? styles.activePill : styles.inactivePill,inactivepill,
              ]}
              activeOpacity={0.7}
              onPress={() => onTabChange && onTabChange(tab)}
            >
              <Text
                style={[
                  styles.pillText,
                  isActive ? styles.activePillText : styles.inactivePillText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabSwitcher;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    
  },
  pill: {
    paddingHorizontal: '5%',
    paddingVertical: '2.5%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePill: {
    backgroundColor: '#2563EB',
  },
  inactivePill: {
    backgroundColor: '#F1F5F9',
  },
  pillText: {
    fontSize: typography.lg,
    fontFamily: Fonts.SemiBold,
    color:"#6B7280"
  },
  activePillText: {
    color: '#FFFFFF',
  },
  inactivePillText: {
    color: '#64748B',
  },
});