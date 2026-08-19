import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from '@react-native-firebase/auth';
import { PROJECTS_DATA } from '../utils/ProjectsData';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { colors } from '../constants/colors';
import { s, vs, ms } from 'react-native-size-matters';

const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const initial = firstName.charAt(0).toUpperCase();

  const getPriorityStyle = priority => {
    switch (priority) {
      case 'Critical':
        return { bg: colors.CriticalRedBg, text: colors.CriticalRedText };
      case 'High':
        return { bg: colors.HighAmberBg, text: colors.HighAmberText };
      case 'Medium':
        return { bg: colors.MediumBlueBg, text: colors.MediumBlueText };
      case 'Low':
        return { bg: colors.LowGreenBg, text: colors.LowGreenText };
      default:
        return { bg: colors.Slate100, text: colors.MutedSlateGray };
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const authInstance = getAuth();
      const currentUser = authInstance.currentUser;

      if (!currentUser) return;

      if (currentUser.displayName) {
        const nameParts = currentUser.displayName.trim().split(' ');
        setFirstName(nameParts[0] || 'User');
        setLastName(nameParts.slice(1).join(' ') || '');
        return;
      }

      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || 'User');
          setLastName(userData.lastName || '');
        } else {
          const rawEmail = currentUser.email?.split('@')[0] || 'User';
          setFirstName(
            rawEmail.charAt(0).toUpperCase() + rawEmail.slice(1)
          );
          setLastName('');
        }
      } catch (error) {
        console.log('Error fetching user data from Firestore:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right','bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Main Container */}
      <View style={styles.content}>
        
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
              <Ionicons name="search-outline" size={ms(20)} color={colors.DarkSlate} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={ms(20)}
                color={colors.DarkSlate}
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
              <View style={[styles.iconBox, { backgroundColor: colors.IndigoIconBg }]}>
                <Feather name="folder" size={ms(18)} color={colors.IndigoIcon} />
              </View>
              <View style={[styles.badge, { backgroundColor: colors.LowGreenBg }]}>
                <Text style={[styles.badgeText, { color: colors.LowGreenText }]}>+2</Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>12</Text>
            <Text style={styles.metricLabel}>Projects</Text>
          </View>

          {/* Tasks */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: colors.PurpleIconBg }]}>
                <Feather name="check-square" size={ms(18)} color={colors.PurpleIcon} />
              </View>
              <View style={[styles.badge, { backgroundColor: colors.LowGreenBg }]}>
                <Text style={[styles.badgeText, { color: colors.LowGreenText }]}>+8</Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>84</Text>
            <Text style={styles.metricLabel}>Tasks</Text>
          </View>

          {/* Pending */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: colors.HighAmberBg }]}>
                <Feather name="clock" size={ms(18)} color={colors.HighAmberText} />
              </View>
              <View style={[styles.badge, { backgroundColor: colors.CriticalRedBg }]}>
                <Text style={[styles.badgeText, { color: colors.CriticalRedText }]}>-3</Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>23</Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </View>

          {/* Done */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: colors.LowGreenBg }]}>
                <Feather name="check-circle" size={ms(18)} color={colors.LowGreenText} />
              </View>
              <View style={[styles.badge, { backgroundColor: colors.LowGreenBg }]}>
                <Text style={[styles.badgeText, { color: colors.LowGreenText }]}>
                  +11
                </Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>61</Text>
            <Text style={styles.metricLabel}>Done</Text>
          </View>
        </View>

        {/* Active Projects Section Header */}
        <View style={styles.activeProjectsHeader}>
          <Text style={styles.sectionTitle}>Active Projects</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable FlatList Container */}
        <View style={styles.flatlistContainer}>
          <FlatList
            data={PROJECTS_DATA}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listPadding}
            renderItem={({ item }) => {
              const priorityStyle = getPriorityStyle(item.priority);

              return (
                <View style={styles.projectCard}>
                  <View
                    style={[
                      styles.folderIconBg,
                      { backgroundColor: `${item.themeColor}15` },
                    ]}
                  >
                    <Ionicons
                      name="folder-open-outline"
                      size={ms(22)}
                      color={item.themeColor}
                    />
                  </View>

                  <View style={styles.projectDetails}>
                    <View style={styles.projectHeaderRow}>
                      <Text style={styles.projectTitle}>{item.title}</Text>
                      <View
                        style={[
                          styles.priorityBadge,
                          { backgroundColor: priorityStyle.bg },
                        ]}
                      >
                        <Text
                          style={[
                            styles.priorityText,
                            { color: priorityStyle.text },
                          ]}
                        >
                          {item.priority}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.progressRow}>
                      <View style={styles.progressBarTrack}>
                        <View
                          style={[
                            styles.progressBarFill,
                            {
                              width: `${item.progress}%`,
                              backgroundColor: item.themeColor,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.progressPercentText}>
                        {item.progress}%
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.OffWhite,
  },
  content: {
    flex: 1,
    paddingHorizontal: s(15),
    paddingTop: vs(12),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(16),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: s(42),
    height: s(42),
    borderRadius: ms(21),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(10),
  },
  avatarText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: ms(14),
  },
  userTextContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: ms(13),
    color: colors.MutedSlateGray,
  },
  userName: {
    fontSize: ms(16),
    fontWeight: '700',
    color: colors.black,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: s(8),
  },
  iconButton: {
    width: s(40),
    height: s(40),
    borderRadius: ms(20),
    backgroundColor: colors.Slate100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: vs(8),
    right: s(8),
    width: s(7),
    height: s(7),
    borderRadius: ms(3.5),
    backgroundColor: colors.CriticalRedText,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: vs(8),
    marginBottom: vs(16),
  },
  metricCard: {
    width: s(155),
    backgroundColor: colors.white,
    borderRadius: ms(16),
    paddingHorizontal: s(14),
    paddingVertical: vs(9),
    borderWidth: 1,
    borderColor: colors.Slate100,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(12),
  },
  iconBox: {
    width: s(36),
    height: s(36),
    borderRadius: ms(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: s(8),
    paddingVertical: vs(4),
    borderRadius: ms(10),
  },
  badgeText: {
    fontSize: ms(11),
    fontWeight: '700',
  },
  metricNumber: {
    fontSize: ms(22),
    fontWeight: '800',
    color: colors.VeryDarkSlateBlue,
  },
  metricLabel: {
    fontSize: ms(13),
    color: colors.SlateGrayText,
    marginTop: vs(4),
  },
  activeProjectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(12),
  },
  sectionTitle: {
    fontSize: ms(16),
    fontWeight: '700',
    color: colors.VeryDarkSlateBlue,
  },
  seeAllText: {
    fontSize: ms(14),
    color: colors.primary,
    fontWeight: '600',
  },
  flatlistContainer: {
    flex: 1,
  },
  listPadding: {
    paddingBottom: vs(16),
  },
  projectCard: {
    backgroundColor: colors.white,
    borderRadius: ms(20),
    paddingHorizontal: s(16),
    paddingVertical: vs(14),
    borderWidth: 1,
    borderColor: colors.LightGray,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vs(10),
  },
  folderIconBg: {
    width: s(44),
    height: s(44),
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(12),
  },
  projectDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  projectHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(8),
  },
  projectTitle: {
    fontSize: ms(15),
    fontWeight: '700',
    color: colors.VeryDarkSlateBlue,
  },
  priorityBadge: {
    paddingHorizontal: s(10),
    paddingVertical: vs(3),
    borderRadius: ms(12),
  },
  priorityText: {
    fontSize: ms(12),
    fontWeight: '600',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarTrack: {
    flex: 1,
    height: vs(6),
    backgroundColor: colors.LightGray,
    borderRadius: ms(4),
    marginRight: s(10),
    overflow: 'hidden',
  },
  progressBarFill: {
    height: vs(6),
    borderRadius: ms(4),
  },
  progressPercentText: {
    fontSize: ms(12),
    fontWeight: '700',
    color: colors.MutedSlateGray,
  },
});