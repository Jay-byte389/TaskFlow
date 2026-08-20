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
import { spacing } from '../constants/spacing';
import { typography } from '../constants/typography';
import { useNavigation } from '@react-navigation/native';
import { Manager_Data, STATUS_DATA } from '../utils/ProjectsData';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../redux/slice/snackBarSlice';


const CreateProjectScreen = () => {
    const dispatch=useDispatch();

  const [status, setStatus] = useState('');
  const [manager, setManager] = useState('');
  const [priority, setPriority] = useState('Low');
  const navigation= useNavigation();
  const handleAddMember = () => {};

  const handleCreate = () => {
    



    try{
    //  navigation.navigate('BottomTabs', { screen: "Home"});
      dispatch(
        showSnackbar({
          message:"Project Created Succesfully",
          type:"success"
        })
      )
    }catch(error){
      dispatch (
        showSnackbar({
          message:"Unable to create project",
          type:"error",
        })
      )
    }
  };

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
              multline={true}
              numberofLines={3}
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
                zIndex={spacing.zIndexMax}
              />

              <DropDown
                headingtxt="PROJECT MANAGER"
                placeholder="Select manager"
                items={Manager_Data}
                value={manager}
                onSelect={setManager}
                zIndex={spacing.zIndexHigh}
              />

              {/* Perfectly Aligned Bottom Section */}
              <View style={styles.addMemberContainer}>
                <Text style={styles.teammmbrtxt}>TEAM MEMBERS</Text>
                <TouchableOpacity
                  style={styles.addMemberbtn}
                  activeOpacity={0.7}
                  onPress={handleAddMember}
                >
                  <View style={styles.nameAndicon}>
                    <Icon
                      name="person-add-outline"
                      size={spacing.mfifteen}
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
    flex: spacing.a,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: spacing.a,
  },
  main: {
    flex: spacing.a,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.vfourteen,
  },
  formContainer: {
    paddingBottom: spacing.vfifteen,
  },
  dropdownContainer: {
    zIndex: spacing.zIndexMax,
    elevation: spacing.zIndexMax,
    marginVertical: spacing.vfour,
  },
  tabSwitchContainer: {
    marginTop: spacing.vsix,
    paddingHorizontal: spacing.hsix,
    zIndex: spacing.a,
  },
  tabSwitcher: {
    marginTop: spacing.vsix,
    paddingHorizontal: spacing.hsix,
    justifyContent: 'center',
  },
  tabswitchertext: {
    fontSize: typography.m,
    fontFamily: Fonts.SemiBold,
    color: colors.Dargrey,
  },
  pill: {
    paddingHorizontal: spacing.eight,
  },

  addMemberContainer: {
    width: spacing.fullWidth,
    marginVertical: spacing.vtewlve,
  },
  teammmbrtxt: {
    color: colors.Dargrey,
    fontSize: spacing.mtwelve,
    fontWeight: '600',
    letterSpacing: spacing.aa,
    marginBottom: spacing.veight,
  },
  addMemberbtn: {
    alignSelf: 'flex-start',
    borderStyle: 'dashed',
    borderWidth: spacing.borderThin,
    borderColor: colors.primary,
    borderRadius: spacing.mtwenty,
    paddingVertical: spacing.veight,
    paddingHorizontal: spacing.fifteen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameAndicon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: colors.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: typography.lg,
    includeFontPadding: false,
    marginLeft: spacing.heights,
    textAlignVertical: 'center',
  },
  buttonWrapper: {
    marginTop: spacing.vsix,
  },
});
