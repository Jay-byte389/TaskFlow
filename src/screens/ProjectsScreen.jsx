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
import { getPriorityStyle, getStatusStyleProj, PROJECTS_DATA } from '../utils/ProjectsData';
import { Fonts } from '../constants/Fonts';
import { spacing } from '../constants/spacing';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import CustomButton from '../components/CustomButton';



const ProjectsScreen = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('CreateProject');
  };
  const handleCreateProject = () => {
    navigation.navigate('CreateProject');
  };


  

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
            <Feather name="search" size={spacing.msixteen} color={colors.TailwindGray} />
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
          ListEmptyComponent={renderEmptyState}
          renderItem={({ item }) => {
            const priorityStyle = getPriorityStyle(item.priority);
            const statusStyle = getStatusStyleProj(item.status);

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
                        size={spacing.mtwenty}
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
                        size={spacing.mthirteen}
                        color={colors.MutedSlateGray}
                      />
                      <Text style={styles.metaText}>{item.tasksCount}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Feather
                        name="users"
                        size={spacing.mthirteen}
                        color={colors.MutedSlateGray}
                      />
                      <Text style={styles.metaText}>{item.membersCount}</Text>
                    </View>
                    <View style={styles.metaItem}>
                      <Feather
                        name="calendar"
                        size={spacing.mthirteen}
                        color={colors.MutedSlateGray}
                      />
                      <Text style={styles.metaText}>{item.dueDate}</Text>
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
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: spacing.a,
  },
  searchMain: {
    paddingVertical: spacing.veight,
    paddingHorizontal: spacing.hsixteen,
    backgroundColor: colors.white,
  },
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: spacing.heights,
    backgroundColor: colors.LightGray,
    paddingVertical: spacing.vtewlve,
    borderRadius: spacing.mtwenty,
  },
  searchTxt: {
    color: colors.black,
    fontFamily: Fonts.Regular,
    fontSize: typography.xl,
    paddingHorizontal: spacing.htwelve,
  },
  tabsContainer: {
    paddingTop: spacing.vtewlve,
  },
  flatist: {
    flex: spacing.a,
  },
  flat: {
    paddingTop: spacing.hfive,
    paddingHorizontal: spacing.hsixteen,
    marginBottom: spacing.hten,
  },
  listPadding: {
    paddingTop: spacing.vtewlve,
    paddingBottom: spacing.vforty,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: spacing.msixteen,
    padding: spacing.hsixteen,
    marginBottom: spacing.veight,
    borderWidth: spacing.borderThin,
    borderColor: colors.Slate100,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'flex-start',
  },
  titleGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.htwelve,
  },
  folderIconBg: {
    width: spacing.hfortyFour,
    height: spacing.hfortyFour,
    borderRadius: spacing.mtwentyTwo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: typography.xl,
    fontFamily: Fonts.SemiBold,
    color:colors.black,
  },
  cardAuthor: {
    fontSize: spacing.meleven,
    fontFamily: Fonts.Regular,
    color:colors.SlateGrayText,
    marginTop: spacing.vtwo,
  },
  priorityBadge: {
    marginTop: spacing.vfour,
    paddingHorizontal: spacing.hten,
    paddingVertical: spacing.vfour,
    borderRadius: spacing.mtwelve,
  },
  priorityText: {
    fontFamily: Fonts.SemiBold,
    fontSize: typography.m,
  },
  metaRow: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    marginTop: spacing.veight,
  },
  metaLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.htwelve,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.hfour,
  },
  metaText: {
    fontSize: typography.m,
    fontFamily: Fonts.Regular,
    color: colors.MutedSlateGray,
    fontWeight: '600',
  },
  statusBadge: {
    backgroundColor: colors.Slate100,
    paddingHorizontal: spacing.hten,
    paddingVertical: spacing.vfour,
    borderRadius: spacing.mtwelve,
  },
  statusText: {
    fontSize: typography.m,
    fontFamily: Fonts.SemiBold,
    color: '#475569',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.hten,
    marginTop: spacing.vseven,
  },
  track: {
    flex: spacing.a,
    height: spacing.vsix,
    backgroundColor: colors.Slate100,
    borderRadius: spacing.vthree,
    overflow: 'hidden',
  },
  fill: {
    height: spacing.fullWidth,
    borderRadius: spacing.vthree,
  },
  progressText: {
    fontSize: typography.lg,
    fontFamily: Fonts.Bold,
    color: colors.black,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justify: 'center',
    paddingVertical: spacing.vthirty,
    paddingHorizontal: spacing.fifteen,
    marginBottom: spacing.vforty,
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
