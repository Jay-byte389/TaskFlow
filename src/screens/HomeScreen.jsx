import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Svg, { Path, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>AC</Text>
            </View>
            <View style={styles.userTextContainer}>
              <Text style={styles.greetingText}>Good morning 👋</Text>
              <Text style={styles.userName}>Alex Chen</Text>
            </View>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search-outline" size={20} color="#1E293B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#1E293B"
              />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 2x2 Metrics Cards with Percentages */}
        <View style={styles.metricsGrid}>
          {/* Projects */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
                <Feather name="folder" size={18} color="#4F46E5" />
              </View>
              <View style={[styles.badge, { backgroundColor: '#DCFCE7' }]}>
                <Text style={[styles.badgeText, { color: '#16A34A' }]}>+2</Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>12</Text>
            <Text style={styles.metricLabel}>Projects</Text>
          </View>

          {/* Tasks */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: '#F3E8FF' }]}>
                <Feather name="check-square" size={18} color="#9333EA" />
              </View>
              <View style={[styles.badge, { backgroundColor: '#DCFCE7' }]}>
                <Text style={[styles.badgeText, { color: '#16A34A' }]}>+8</Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>84</Text>
            <Text style={styles.metricLabel}>Tasks</Text>
          </View>

          {/* Pending */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: '#FEF3C7' }]}>
                <Feather name="clock" size={18} color="#D97706" />
              </View>
              <View style={[styles.badge, { backgroundColor: '#FEE2E2' }]}>
                <Text style={[styles.badgeText, { color: '#EF4444' }]}>-3</Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>23</Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </View>

          {/* Done */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
                <Feather name="check-circle" size={18} color="#16A34A" />
              </View>
              <View style={[styles.badge, { backgroundColor: '#DCFCE7' }]}>
                <Text style={[styles.badgeText, { color: '#16A34A' }]}>
                  +11
                </Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>61</Text>
            <Text style={styles.metricLabel}>Done</Text>
          </View>
        </View>

        {/* Weekly Progress Section */}
        {/* <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>Weekly Progress</Text>

          <View style={styles.chartContainer}>
            <View style={styles.yAxis}>
              <Text style={styles.axisLabel}>100%</Text>
              <Text style={styles.axisLabel}>75%</Text>
              <Text style={styles.axisLabel}>50%</Text>
              <Text style={styles.axisLabel}>25%</Text>
              <Text style={styles.axisLabel}>0%</Text>
            </View>

            <View style={styles.chartArea}>
              <Svg height="140" width="100%" viewBox="0 0 280 140">
                <Defs>
                  <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
                    <Stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                  </LinearGradient>
                </Defs>

                <Line x1="0" y1="10" x2="280" y2="10" stroke="#F1F5F9" strokeDasharray="3,3" />
                <Line x1="0" y1="40" x2="280" y2="40" stroke="#F1F5F9" strokeDasharray="3,3" />
                <Line x1="0" y1="70" x2="280" y2="70" stroke="#F1F5F9" strokeDasharray="3,3" />
                <Line x1="0" y1="100" x2="280" y2="100" stroke="#F1F5F9" strokeDasharray="3,3" />
                <Line x1="0" y1="130" x2="280" y2="130" stroke="#F1F5F9" strokeDasharray="3,3" />

                <Path
                  d="M 10 90 C 30 50, 45 40, 60 40 C 80 40, 90 90, 105 90 C 125 90, 135 20, 155 20 C 180 20, 200 80, 230 110 C 250 120, 265 122, 275 125 L 275 130 L 10 130 Z"
                  fill="url(#grad)"
                />

              
                <Path
                  d="M 10 90 C 30 50, 45 40, 60 40 C 80 40, 90 90, 105 90 C 125 90, 135 20, 155 20 C 180 20, 200 80, 230 110 C 250 120, 265 122, 275 125"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="2.5"
                />
              </Svg>

              <View style={styles.xAxis}>
                <Text style={styles.axisLabel}>Mon</Text>
                <Text style={styles.axisLabel}>Tue</Text>
                <Text style={styles.axisLabel}>Wed</Text>
                <Text style={styles.axisLabel}>Thu</Text>
                <Text style={styles.axisLabel}>Fri</Text>
                <Text style={styles.axisLabel}>Sat</Text>
                <Text style={styles.axisLabel}>Sun</Text>
              </View>
            </View>
          </View>
        </View> */}

        {/* Active Projects Section */}
        <View style={styles.activeProjectsHeader}>
          <Text style={styles.sectionTitle}>Active Projects</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Project Card */}
        <View style={styles.projectCard}>
          <View style={[styles.projectIcon, { backgroundColor: '#EEF2FF' }]}>
            <Ionicons name="folder-open-outline" size={22} color="#2563EB" />
          </View>

          <View style={styles.projectDetails}>
            <View style={styles.projectHeaderRow}>
              <Text style={styles.projectTitle}>Mobile App Redesign</Text>
              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>High</Text>
              </View>
            </View>

            <View style={styles.progressRow}>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: '68%' }]} />
              </View>
              <Text style={styles.progressPercentText}>68%</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: '5%',
    paddingTop: '3%',
    paddingBottom: '22%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5%',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '3%',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  userTextContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 13,
    color: '#64748B',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: '22.5%',
    right: '25%',
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
  },

  // Grid Cards
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: '4%',
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: '4%',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8%',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: '4%',
    paddingVertical: '1.5%',
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  metricNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  metricLabel: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: '1.5%',
  },

  // Chart Card
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: '4%',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: '5%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  chartContainer: {
    flexDirection: 'row',
    marginTop: '3%',
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: '2%',
    height: 125,
  },
  axisLabel: {
    fontSize: 10,
    color: '#94A3B8',
  },
  chartArea: {
    flex: 1,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '1.5%',
  },

  // Active Projects
  activeProjectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3%',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  projectCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: '4.5%',
    paddingVertical: '4%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '4%',
  },
  projectIcon: {
    width:'15%',
    aspectRatio:1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '3.5%',
  },
  projectDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  projectHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2.5%',
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  priorityBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '600',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginRight: '3%',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },
  progressPercentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },

  // Bottom Navigation Bar
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: '1%',
  },
});
