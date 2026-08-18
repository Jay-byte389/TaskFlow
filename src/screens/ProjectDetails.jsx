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
import { Mobile_AppDesign } from '../utils/ProjectsData';

const ProjectDetails = () => {
  const route = useRoute();
  const project = route.params?.project;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Tasks');
  const tabs = ['Tasks', 'Team', 'Files', 'Activity'];

  // Priority badge styling (top card)
  const getPriorityStyle = priority => {
    switch (priority) {
      case 'Critical':
        return { bg: '#FEE2E2', text: '#EF4444' };
      case 'High':
        return { bg: '#FEF3C7', text: '#D97706' };
      case 'Medium':
        return { bg: '#E0F2FE', text: '#0284C7' };
      case 'Low':
        return { bg: '#DCFCE7', text: '#16A34A' };
      default:
        return { bg: '#F1F5F9', text: '#64748B' };
    }
  };

  // Status badge styling (task item list)
  const getStatusStyle = status => {
    switch (status) {
      case 'In Progress':
        return { bg: '#E0F2FE', text: '#1E40AF', dot: '#F59E0B' };
      case 'Completed':
        return { bg: '#DCFCE7', text: '#166534', dot: '#F59E0B' };
      case 'Backlog':
        return { bg: '#F1F5F9', text: '#64748B', dot: '#2563EB' };
      case 'Testing':
        return { bg: '#F3E8FF', text: '#6B21A8', dot: '#10B981' };
      default:
        return { bg: '#F1F5F9', text: '#64748B', dot: '#64748B' };
    }
  };

  const handleNext = () => {
    navigation.navigate('EditProject',{project});
  };

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
                { backgroundColor: `${project?.themeColor || '#2563EB'}15` },
              ]}
            >
              <Feather
                name="folder"
                size={22}
                color={project?.themeColor || '#2563EB'}
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
            <Text style={styles.progressText}>{project?.progress || 0}%</Text>
          </View>
          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                {
                  width: `${project?.progress || 0}%`,
                  backgroundColor: project?.themeColor || '#2563EB',
                },
              ]}
            />
          </View>
        </View>

        {/* 4 Cards Stat Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Feather name="check-square" size={16} color="#2563EB" />
            <Text style={styles.statNumber}>{project?.tasksCount || 0}</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="users" size={16} color="#2563EB" />
            <Text style={styles.statNumber}>{project?.membersCount || 0}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="calendar" size={16} color="#2563EB" />
            <Text style={styles.statNumber}>Oct 01</Text>
            <Text style={styles.statLabel}>Start</Text>
          </View>

          <View style={styles.statCard}>
            <Feather name="flag" size={16} color="#2563EB" />
            <Text style={styles.statNumber}>{project?.dueDate || 'N/A'}</Text>
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
        <View style={styles.addTask}>
          <TouchableOpacity style={styles.addtskbtn} activeOpacity={0.7}>
            <Feather
              name="plus"
              size={18}
              color={colors.primary || '#2563EB'}
            />
            <Text style={styles.addtxt}>Add Task</Text>
          </TouchableOpacity>
        </View>

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
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: '4%',
    paddingTop: '3%',
    paddingBottom: '6%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  folderIconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.Bold || 'System',
    color: '#0F172A',
  },
  cardAuthor: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: '1%',
  },
  priorityBadge: {
    paddingHorizontal: '3%',
    paddingVertical: '1.2%',
    borderRadius: 14,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressSection: {
    marginTop: '5%',
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2%',
  },
  progressLabel: {
    fontSize: 14,
    color: '#64748B',
    
  },
  progressText: {
    fontSize: 14,
    fontFamily: Fonts.Bold ,
    color: '#0F172A',
  },
  track: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingVertical: '3.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
    color: '#0F172A',
    marginTop: '5%',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: '1%',
  },
  tabcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    marginTop: '5%',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: '#2563EB',
  },
  tabText: {
    fontSize: 13,
    fontFamily: Fonts.SemiBold ,
  },
  activeTabText: {
    color: '#2563EB',
  },
  inactiveTabText: {
    color: '#64748B',
  },
  addTask: {
    marginTop: '4%',
    borderRadius: 24,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2.5%',
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#FFFFFF',
  },
  addtskbtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addtxt: {
    marginLeft: '2%',
    color: colors.primary,
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
  },
  tasklist: {
    marginTop: '3.5%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '3.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: '2.5%',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: '2.5%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: '3.5%',
  },
  nameAndtitle: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: '#0F172A',
  },
  taskAuthor: {
    fontSize: 10,
    fontFamily: Fonts.Regular,
    color: '#6B7280',
    marginTop: '1%',
  },
  statusBadge: {
    paddingHorizontal: '3%',
    paddingVertical: '1.2%',
    borderRadius: 14,
  },
  statusText: {
    fontSize: 10,
    fontFamily: Fonts.SemiBold,
  },
});