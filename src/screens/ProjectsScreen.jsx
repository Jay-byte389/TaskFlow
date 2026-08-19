import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import ProjectsHeader from '../components/ProjectsHeaer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import TabSwitcher from '../components/TabSwitcher';
import { PROJECTS_DATA } from '../utils/ProjectsData';
import { Fonts } from '../constants/Fonts';
const ProjectsScreen = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigation = useNavigation();
  
  const handleNext = () => {
    navigation.navigate('CreateProject');
  };

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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <ProjectsHeader
          title="Projects"
          rightIcon="add"
          isMainScreen
          onRightPress={handleNext}
        />
      </View>

      <View style={styles.searchMain}>
        <TouchableOpacity style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <Feather name="search" size={16} color="#9CA3AF" />
          </View>
          <Text style={styles.searchTxt}>Search projects.....</Text>
        </TouchableOpacity>
        <View style={styles.tabsContainer}>
          <TabSwitcher
            tabs={['All', 'Active', 'Review', 'Done']}
            activeTab={activeTab}
            onTabChange={tab => setActiveTab(tab)}
          />
        </View>
      </View>
      <View style={styles.flatist}>
        <FlatList
          data={PROJECTS_DATA}
          style={styles.flat}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => {
            {
              const priorityStyle = getPriorityStyle(item.priority);

              return (
                <TouchableOpacity
                  style={styles.card}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('ProjectDetails', { project: item })
                  }
                >
                  {/* Header Row: Title & Priority */}
                  <View style={styles.cardHeader}>
                    <View style={styles.titleGroup}>
                      <View
                        style={[
                          styles.folderIconBg,
                          { backgroundColor: `${item.themeColor}15` },
                        ]}
                      >
                        <Feather
                          name="folder"
                          size={20}
                          color={item.themeColor}
                        />
                      </View>
                      <View>
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.cardAuthor}>{item.author}</Text>
                      </View>
                    </View>

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

                  {/* Meta Data Row: Tasks, Members, Due Date, Status */}
                  <View style={styles.metaRow}>
                    <View style={styles.metaLeft}>
                      <View style={styles.metaItem}>
                        <Feather
                          name="check-square"
                          size={13}
                          color="#64748B"
                        />
                        <Text style={styles.metaText}>{item.tasksCount}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Feather name="users" size={13} color="#64748B" />
                        <Text style={styles.metaText}>{item.membersCount}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Feather name="calendar" size={13} color="#64748B" />
                        <Text style={styles.metaText}>{item.dueDate}</Text>
                      </View>
                    </View>

                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                  </View>

                  {/* Progress Bar Row */}
                  <View style={styles.progressRow}>
                    <View style={styles.track}>
                      <View
                        style={[
                          styles.fill,
                          {
                            width: `${item.progress}%`,
                            backgroundColor: item.themeColor,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>{item.progress}%</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  searchMain: {
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: '2%',
    backgroundColor: '#E2E8F0',
    paddingVertical: '4%',
    borderRadius: 20,
  },
  searchTxt: {
    color: '#111827',
    bottom: '10%',
    paddingHorizontal: '3%',
  },
  tabsContainer: {
    paddingTop: '3%',
  },
  
  flat: {
    
    paddingVertical: '4%',
  },
  listPadding: {
    paddingHorizontal: '4%',
    paddingBottom: '50%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
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
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: '#0F172A',
  },
  cardAuthor: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  metaLeft: {
    flexDirection: 'row',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  track: {
    flex: 1,
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
});
