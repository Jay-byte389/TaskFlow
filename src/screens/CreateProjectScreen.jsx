import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import ProjectHeader from '../components/ProjectsHeaer';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateRangePicker from '../components/DatePicker';
import Input from '../components/Input';
import { colors } from '../constants/colors';
import TabSwitcher from '../components/TabSwitcher';
import DropDown from '../components/DropDown';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { Fonts } from '../constants/Fonts';

const STATUS_DATA = [
  { label: 'Not Started', value: 'Not Started' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'On Hold', value: 'On Hold' },
  { label: 'Completed', value: 'Completed' },
];

const Manager_Data = [
  { label: 'Alex Chen', value: 'Alex Chen' },
  { label: 'Sarah Kim', value: 'Sarah Kim' },
];

const CreateProjectScreen = () => {
  const [activeTab, setActiveTab] = useState('Low');
  const [status, setStatus] = useState('');
  const [manager, setManager] = useState('');
  const [projectName, setProjectName] = useState('');
  const [desc, setDesc] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [priority, setPriority] = useState('Low');
  const [teamMembers, setTeamMembers] = useState([]);

  const handleAddUser = () => {};

  const handleCreate = () => {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.main}>
          <ProjectHeader showBack title="New Project" />

          <ScrollView
            contentContainerStyle={styles.formContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            <Input
              label="project Name"
              icon="briefcase-outline"
              placeholder="Enter Project Name"
              placeholderTextColor={colors.Dargrey}
            />

            <Input
              label="Description"
              placeholder="Project Description...."
              placeholderTextColor={colors.Dargrey}
            />
            <DateRangePicker />
            <View style={styles.tabSwitchContainer}>
              <Text style={styles.tabswitchertext}>PRIORITY</Text>
              <TabSwitcher
                tabs={['Low', 'Medium', 'High', 'Critical']}
                activeTab={priority}
                onTabChange={tab => setPriority(tab)}
                style={styles.tabSwitcher}
                pillstyle={styles.pill}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <DropDown
                headingtxt="STATUS"
                placeholder="Select status"
                items={STATUS_DATA}
                value={status}
                onSelect={setStatus}
                zIndex={5000}
              />

              <DropDown
                headingtxt="PROJECT MANAGER"
                placeholder="Select manager"
                items={Manager_Data}
                value={manager}
                onSelect={setManager}
                zIndex={4000}
              />

              {/* Perfectly Aligned Bottom Section */}
              <View style={styles.addMemberContainer}>
                <Text style={styles.teammmbrtxt}>TEAM MEMBERS</Text>
                <TouchableOpacity
                  style={styles.addMemberbtn}
                  activeOpacity={0.7}
                  onPress={handleAddUser}
                >
                  <View style={styles.nameAndicon}>
                    <Icon
                      name="person-add-outline"
                      size={15}
                      color={colors.primary}
                    />
                    <Text style={styles.txt}>Add Members</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonWrapper}>
                <CustomButton title="Create Project" onPress={handleCreate} />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateProjectScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: '4%',
  },
  formContainer: {
    paddingBottom: '10%',
  },
  dropdownContainer: {
    zIndex: 5000,
    elevation: 5000,
    marginVertical: '1%',
  },
  tabSwitchContainer: {
    marginTop: '2%',
    paddingHorizontal: '2%',
    zIndex: 1,
  },
  tabSwitcher: {
    marginTop: '2%',
    paddingHorizontal: '3%',
    justifyContent: 'center',
  },
  tabswitchertext: {
    color: colors.Dargrey,
    fontSize: 13,
  },
  pill: {
    paddingHorizontal: '8%',
  },

  addMemberContainer: {
    width: '100%',
    marginVertical: '4%',
  },
  teammmbrtxt: {
    color: colors.Dargrey,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: '2%',
  },
  addMemberbtn: {
    alignSelf: 'flex-start',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameAndicon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '4%',
  },
  txt: {
    color: colors.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: 13,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  buttonWrapper: {
    marginTop: '2%',
  },
});