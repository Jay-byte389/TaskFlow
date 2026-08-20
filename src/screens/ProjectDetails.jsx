import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import ProjectsHeader from '../components/ProjectsHeaer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Fonts } from '../constants/Fonts';
import { colors } from '../constants/colors';
import {
  getPriorityStyle,
  getStatusStyle,
  Mobile_AppDesign,
} from '../utils/ProjectsData';
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';

const ProjectDetails = () => {
  const route = useRoute();
  const project = route.params?.project;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Tasks');
  const tabs = ['Tasks', 'Team', 'Files', 'Activity'];

  const handleNext = () => {
    navigation.navigate('EditProject', { project });
  };

  const handleAddTask= ()=>{

  }
  
  const priorityStyle = getPriorityStyle(project?.priority);

  return (
    <SafeAreaView style={styles.main}>
      <ProjectsHeader
        showBack
        rightIcon="edit-2"
        RightIconComponent={Feather}
        onRightPress={handleNext}
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & Priority Header Row */}
        <View style={styles.cardHeader}>
          <View style={styles.titleGroup}>
            <View
              style={[
                styles.folderIconBg,
                {
                  backgroundColor: `${project?.themeColor || colors.primary}15`,
                },
              ]}
            >
              <Feather
                name="folder"
                size={spacing.mtwentyTwo}
                color={project?.themeColor || colors.primary}
              />
            </View>
            <View>
              <Text style={styles.cardTitle}>{project?.title}</Text>
              <Text style={styles.cardAuthor}>{project?.author}</Text>
            </View>
          </View>

          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: priorityStyle.bg },
            ]}
          >
            <Text style={[styles.priorityText, { color: priorityStyle.text }]}>
              {project?.priority}
            </Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.progressLabel}>Progress</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  {
                    width: `${project?.progress || 0}%`,
                    backgroundColor: project?.themeColor || colors.primary,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{project?.progress || 0}%</Text>
          </View>
        </View>

        {/* 4 Cards Stat Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Feather
              name="check-square"
              size={spacing.msixteen}
              color={colors.primary}
            />
            <Text style={styles.statNumber}>{project?.tasksCount}</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>

          <View style={styles.statCard}>
            <Feather
              name="users"
              size={spacing.msixteen}
              color={colors.primary}
            />
            <Text style={styles.statNumber}>{project?.membersCount}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>

          <View style={styles.statCard}>
            <Feather
              name="calendar"
              size={spacing.msixteen}
              color={colors.primary}
            />
            <Text style={styles.statNumber}>{project?.startDate}</Text>
            <Text style={styles.statLabel}>Start</Text>
          </View>

          <View style={styles.statCard}>
            <Feather
              name="flag"
              size={spacing.msixteen}
              color={colors.primary}
            />
            <Text style={styles.statNumber}>{project?.dueDate}</Text>
            <Text style={styles.statLabel}>End</Text>
          </View>
        </View>

        {/* Tab Switcher Navigation */}
        <View style={styles.tabcontainer}>
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={`tab-${tab}-${index}`}
                style={[styles.tabItem, isActive && styles.activeTabItem]}
                activeOpacity={0.7}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive ? styles.activeTabText : styles.inactiveTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Add Task Button */}
       {/* Add Task Button (Entire Container Touchable) */}
        <TouchableOpacity
          style={styles.addTaskButton}
          activeOpacity={0.7}
          onPress={handleAddTask}
        >
          <Feather
            name="plus"
            size={spacing.meighteen}
            color={colors.primary}
          />
          <Text style={styles.addtxt}>Add Task</Text>
        </TouchableOpacity>

        {/* Task List */}
        <View style={styles.tasklist}>
          <FlatList
            data={Mobile_AppDesign}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const statusStyle = getStatusStyle(item.status);
              return (
                <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                  <View style={styles.cardLeft}>
                    <View
                      style={[styles.dot, { backgroundColor: statusStyle.dot }]}
                    />
                    <View style={styles.nameAndtitle}>
                      <Text style={styles.taskTitle}>{item.title}</Text>
                      <Text style={styles.taskAuthor}>{item.author}</Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: statusStyle.bg },
                    ]}
                  >
                    <Text
                      style={[styles.statusText, { color: statusStyle.text }]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectDetails;

const styles = StyleSheet.create({
  main: {
    flex: spacing.a,
    backgroundColor: colors.white,
  },
  contentContainer: {
    paddingHorizontal: spacing.fifteen,
    paddingTop: spacing.vfifteen,
    paddingBottom: spacing.vten,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.htwelve,
  },
  folderIconBg: {
    width: spacing.hfortyOne,
    aspectRatio: spacing.a,
    borderRadius: spacing.mtwenty,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: typography.font18,
    fontFamily: Fonts.Bold,
    color: colors.VeryDarkSlateBlue,
  },
  cardAuthor: {
    fontSize: typography.lg,
    color: colors.SlateGrayText,
  },
  priorityBadge: {
    marginLeft: spacing.hfive,
    paddingHorizontal: spacing.three,
    paddingVertical: spacing.vfive,
    borderRadius: spacing.mfourteen,
    marginTop: spacing.vtwo,
  },
  priorityText: {
    fontFamily: Fonts.SemiBold,
    fontSize: typography.m,
    fontWeight: '700',
  },
  progressSection: {
    marginTop: spacing.vfive,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.two,
  },
  progressLabel: {
    fontSize: typography.m,
    fontFamily: Fonts.SemiBold,
    color: colors.MutedSlateGray,
  },
  progressText: {
    fontSize: spacing.mfourteen,
    fontFamily: Fonts.Bold,
    color: colors.VeryDarkSlateBlue,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.hten,
  },
  track: {
    flex: spacing.a,
    height: spacing.vfour,
    backgroundColor: colors.Slate100,
    borderRadius: spacing.mfour,
    overflow: 'hidden',
  },
  fill: {
    height: spacing.fullWidth,
    borderRadius: spacing.mfour,
  },
  statsGrid: {
    flexDirection: 'row',
    justify: 'space-between',
    marginTop: spacing.veight,
    gap: spacing.heights,
  },
  statCard: {
    flex: spacing.a,
    backgroundColor: colors.OffWhite,
    borderRadius: spacing.msixteen,
    paddingVertical: spacing.vsix,
    alignItems: 'center',
    justify: 'center',
  },
  statNumber: {
    fontSize: typography.xl,
    fontFamily: Fonts.Bold,
    color: colors.VeryDarkSlateBlue,
    marginTop: spacing.vthree,
  },
  statLabel: {
    fontFamily: Fonts.Regular,
    fontSize: typography.m,
    color: colors.SlateGrayText,
    marginTop: spacing.vtwo,
  },
  tabcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: spacing.borderThin,
    borderBottomColor: colors.LightGray,
    backgroundColor: colors.white,
    marginTop: spacing.vten,
  },
  tabItem: {
    flex: spacing.a,
    alignItems: 'center',
    justify: 'center',
    paddingVertical: spacing.veight,
    borderBottomWidth: spacing.vtwo,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.lg,
    fontFamily: Fonts.SemiBold,
  },
  activeTabText: {
    color: colors.primary,
  },
  inactiveTabText: {
    color: colors.MutedSlateGray,
  },
  addTaskButton: {
    marginTop: spacing.vtewlve,
    borderRadius: spacing.mtwentyFour,
    borderStyle: 'dashed',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.veight,
    borderWidth: spacing.borderThin,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  addtxt: {
    marginLeft: spacing.hfive,
    color: colors.primary,
    fontSize: typography.xl,
    fontFamily: Fonts.SemiBold,
  },
  tasklist: {
    marginTop: spacing.vten,
  },
  card: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.htwelve,
    paddingVertical: spacing.vten,
    backgroundColor: colors.white,
    borderRadius: spacing.mtwenty,
    borderWidth: spacing.borderThin,
    borderColor: colors.LightGray,
    marginBottom: spacing.vseven,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: spacing.a,
    paddingRight: spacing.vtwo,
  },
  dot: {
    width: spacing.heights,
    height: spacing.vseven,
    borderRadius: spacing.msix,
    marginRight: spacing.vseven,
  },
  nameAndtitle: {
    flex: spacing.a,
  },
  taskTitle: {
    fontSize: typography.m,
    fontFamily: Fonts.Medium,
    color: colors.VeryDarkSlateBlue,
  },
  taskAuthor: {
    fontSize: spacing.mten,
    fontFamily: Fonts.Regular,
    color: colors.Dargrey,
    marginTop: spacing.vtwo,
  },
  statusBadge: {
    paddingHorizontal: spacing.veight,
    paddingVertical: spacing.vfour,
    borderRadius: spacing.mfourteen,
  },
  statusText: {
    fontSize: spacing.mten,
    fontFamily: Fonts.SemiBold,
  },
});
