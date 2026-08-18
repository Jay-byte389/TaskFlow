import React, { useEffect, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from '@react-native-firebase/auth';

// 1. ADDED FIRESTORE IMPORTS
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const initial = firstName.charAt(0).toUpperCase();

  useEffect(() => {
    const fetchUserData = async () => {
      const authInstance = getAuth();
      const currentUser = authInstance.currentUser;

      if (!currentUser) return;

      // Check 1: Google Sign-In (displayName)
      if (currentUser.displayName) {
        const nameParts = currentUser.displayName.trim().split(' ');
        setFirstName(nameParts[0] || 'User');
        setLastName(nameParts.slice(1).join(' ') || '');
        return;
      }

      // Check 2: Email/Password (Fetch from Firestore)
      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || 'User');
          setLastName(userData.lastName || '');
        } else {
          // Check 3: Parsing from Email string if document doesn't exist
          const rawEmail = currentUser.email?.split('@')[0] || 'User';
          setFirstName(rawEmail[0].charAt(0).toUpperCase() + emailParts[0].slice(1));
          setLastName(rawEmail.slice(1).join(' '));
        }
      } catch (error) {
        console.log('Error fetching user data from Firestore:', error);
      }
    };

    fetchUserData();
  }, []);

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
              <Text style={styles.avatarText}>{initial || 'U'}</Text>
            </View>
            <View style={styles.userTextContainer}>
              <Text style={styles.greetingText}>Good morning 👋</Text>
              <Text style={styles.userName}>
                {firstName} {lastName}
              </Text>
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

        {/* 2x2 Metrics Cards */}
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
    width: '15%',
    aspectRatio: 1,
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
});