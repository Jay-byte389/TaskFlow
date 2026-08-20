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
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
import { getPriorityStyle, PROJECTS_DATA } from '../utils/ProjectsData';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';
import { Fonts } from '../constants/Fonts';
import { typography } from '../constants/typography';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation=useNavigation();
  const initial = firstName.charAt(0).toUpperCase();


  const handleCreateProject =()=>{
    navigation.navigate("CreateProject")
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const authInstance = getAuth();
      const currentUser = authInstance.currentUser;

      if (!currentUser) return;

      if (currentUser.displayName) {
        const nameParts = currentUser.displayName.trim().split(' ');
        setFirstName(nameParts[0] || 'User');
        setLastName(nameParts.slice(1).join(' '));
        return;
      }
    };

    fetchUserData();
  }, []);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconBox}>
        <Feather name="folder-minus" size={32} color={colors.MutedSlateGray} />
      </View>
      <Text style={styles.emptyTitle}>No Active Projects</Text>
      <Text style={styles.emptySubtitle}>
        You don't have any active projects right now. Create a new one to get
        started!
      </Text>
      <CustomButton title="Create Project" onPress={handleCreateProject} />
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right', 'bottom']}
    >
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
              <Ionicons
                name="search-outline"
                size={20}
                color={colors.DarkSlate}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="notifications-outline"
                size={20}
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
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: colors.IndigoIconBg },
                ]}
              >
                <Feather name="folder" size={18} color={colors.IndigoIcon} />
              </View>
              <View
                style={[styles.badge, { backgroundColor: colors.LowGreenBg }]}
              >
                <Text
                  style={[styles.badgeText, { color: colors.LowGreenText }]}
                >
                  +2
                </Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>12</Text>
            <Text style={styles.metricLabel}>Projects</Text>
          </View>

          {/* Tasks */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: colors.PurpleIconBg },
                ]}
              >
                <Feather
                  name="check-square"
                  size={18}
                  color={colors.PurpleIcon}
                />
              </View>
              <View
                style={[styles.badge, { backgroundColor: colors.LowGreenBg }]}
              >
                <Text
                  style={[styles.badgeText, { color: colors.LowGreenText }]}
                >
                  +8
                </Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>84</Text>
            <Text style={styles.metricLabel}>Tasks</Text>
          </View>

          {/* Pending */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: colors.HighAmberBg },
                ]}
              >
                <Feather name="clock" size={18} color={colors.HighAmberText} />
              </View>
              <View
                style={[
                  styles.badge,
                  { backgroundColor: colors.CriticalRedBg },
                ]}
              >
                <Text
                  style={[styles.badgeText, { color: colors.CriticalRedText }]}
                >
                  -3
                </Text>
              </View>
            </View>
            <Text style={styles.metricNumber}>23</Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </View>

          {/* Done */}
          <View style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <View
                style={[styles.iconBox, { backgroundColor: colors.LowGreenBg }]}
              >
                <Feather
                  name="check-circle"
                  size={18}
                  color={colors.LowGreenText}
                />
              </View>
              <View
                style={[styles.badge, { backgroundColor: colors.LowGreenBg }]}
              >
                <Text
                  style={[styles.badgeText, { color: colors.LowGreenText }]}
                >
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
            ListEmptyComponent={renderEmptyState}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
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
                      size={spacing.mtwentyTwo}
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
    paddingHorizontal: spacing.fifteen,
    paddingTop: spacing.vtewlve,
  },
  header: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.vsixteen,
    backgroundColor: colors.white,
    paddingVertical: spacing.hten,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: spacing.hfourtytwo,
    height: spacing.hfourtytwo,
    borderRadius: spacing.btewntyone,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.hten,
  },
  avatarText: {
    color: colors.white,
    fontFamily: Fonts.Bold,
    fontSize: typography.xxl,
  },
  userTextContainer: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: typography.lg, // 13
    color: colors.MutedSlateGray,
  },
  userName: {
    fontSize: typography.tm,
    fontWeight: '700',
    color: colors.black,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.heights,
  },
  iconButton: {
    width: spacing.hforty,
    height: spacing.hforty,
    borderRadius: spacing.mtwenty,
    backgroundColor: colors.Slate100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: spacing.veight,
    right: spacing.hten,
    width: spacing.hseven,
    height: spacing.hseven,
    borderRadius: spacing.mthreePointFive,
    backgroundColor: colors.CriticalRedText,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.veight,
    marginBottom: spacing.vsixteen,
  },
  metricCard: {
    width: spacing.hOneFiftyFive,
    backgroundColor: colors.white,
    borderRadius: spacing.msixteen,
    paddingHorizontal: spacing.hfourteen,
    paddingVertical: spacing.vnine,
    borderWidth: spacing.borderThin,
    borderColor: colors.Slate100,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.vsix,
  },
  iconBox: {
    width: spacing.hthirtySix,
    height: spacing.hthirtySix,
    borderRadius: spacing.meighteen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: spacing.heights,
    paddingVertical: spacing.vfour,
    borderRadius: spacing.mten,
  },
  badgeText: {
    fontSize: typography.lg,
    fontWeight: '700',
  },
  metricNumber: {
    paddingLeft: spacing.heights,
    fontSize: typography.font20,
    fontFamily: Fonts.ExtraBold,
    fontWeight: '800',
    color: colors.VeryDarkSlateBlue,
  },
  metricLabel: {
    paddingLeft: spacing.hfour,
    fontSize: typography.lg, // 13
    fontFamily: Fonts.Regular,
    color: colors.SlateGrayText,
    marginTop: spacing.vone,
  },
  activeProjectsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.vtewlve,
  },
  sectionTitle: {
    fontSize: typography.xl,
    fontFamily: Fonts.SemiBold,
    color: colors.VeryDarkSlateBlue,
  },
  seeAllText: {
    fontSize: typography.xl,
    fontFamily: Fonts.SemiBold,
    color: colors.primary,
  },
  flatlistContainer: {
    flex: 1,
  },
  listPadding: {
    paddingBottom: spacing.vfifty,
  },
  projectCard: {
    backgroundColor: colors.white,
    borderRadius: spacing.mtwenty,
    paddingHorizontal: spacing.hsixteen,
    paddingVertical: spacing.vfourteen,
    borderWidth: spacing.borderThin,
    borderColor: colors.LightGray,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.vten,
  },
  folderIconBg: {
    width: spacing.hfortyFour,
    height: spacing.hfortyFour,
    borderRadius: spacing.mtwenty,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.htwelve,
  },
  projectDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  projectHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.vfive,
  },
  projectTitle: {
    fontSize: typography.xl,
    fontFamily: Fonts.SemiBold,
    color: colors.VeryDarkSlateBlue,
  },
  priorityBadge: {
    paddingHorizontal: spacing.hten,
    paddingVertical: spacing.vthree,
    borderRadius: spacing.mtwelve,
  },
  priorityText: {
    fontSize: typography.m,
    fontFamily: Fonts.SemiBold,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarTrack: {
    flex: 1,
    height: spacing.vsix,
    backgroundColor: colors.LightGray,
    borderRadius: spacing.mfour,
    marginRight: spacing.hten,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: spacing.vsix,
    borderRadius: spacing.mfour,
  },
  progressPercentText: {
    fontSize: spacing.mtwelve,
    fontWeight: '700',
    color: colors.MutedSlateGray,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justify: 'center',
    paddingVertical: spacing.vthirty,
    paddingHorizontal: spacing.fifteen,
    marginBottom:spacing.vforty,
  },
  emptyIconBox: {
    width: spacing.hfortyEight,
    height: spacing.hfortyEight,
    borderRadius: spacing.meighteen,
    backgroundColor: colors.Slate100,
    alignItems: 'center',
    justify: 'center',
    marginBottom: spacing.vtewlve,
  },
  emptyTitle: {
    fontSize: typography.xxl,
    fontFamily: Fonts.Bold,
    color: colors.VeryDarkSlateBlue,
    marginBottom: spacing.vfour,
  },
  emptySubtitle: {
    fontSize: typography.lg,
    fontFamily: Fonts.Regular,
    color: colors.MutedSlateGray,
    textAlign: 'center',
    lineHeight: spacing.lhTwenty,
  },
});
