import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProjectsHeader from '../components/ProjectsHeaer';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../components/Input';
import { colors } from '../constants/colors';
import DateRangePicker from '../components/DatePicker';
import TabSwitcher from '../components/TabSwitcher';
import DropDown from '../components/DropDown';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import { Fonts } from '../constants/Fonts';
import { spacing } from '../constants/spacing';
import { users } from '../utils/ProjectsData';

const EditProjectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const project = route.params?.project || {};
  const [activeTab, setActiveTab] = useState('Low');
  const [selectedUser, setSelectedUser] = useState('1');
  
  const currentUserObj = users.find(u => u.value === selectedUser);

  const handleSave = () => {
      navigation.goBack()

  };

 const handleCancel =()=>{
  navigation.goBack()
}


 const handleBack =()=>{
  navigation.navigate("")
 }

 const handleRemoveUser =()=>{}
  return (
    <SafeAreaView style={styles.main}>
      <ProjectsHeader
        showBack
        title="Edit Project"
        isDestructive
        rightIcon="trash-outline" onBackPress={handleBack}
      />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : spacing.htwenty}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            <Input
              label="PROJECT NAME"
              placeholder={project.title || 'Project Name'}
              icon="briefcase-outline"
              placeholderTextColor={colors.black}
            />
            <Input label="Description" placeholder="Project Description" />

            <DateRangePicker />

            <View style={styles.tabSwitchContainer}>
              <Text style={styles.tabswitchertext}>PRIORITY</Text>
              <TabSwitcher
                tabs={['Low', 'Medium', 'High', 'Critical']}
                activeTab={activeTab}
                onTabChange={tab => setActiveTab(tab)}
                style={styles.tabSwitcher}
                pillstyle={styles.pill}
                inactivepill={styles.inactive}
              />
            </View>

            <DropDown
              headingtxt="MANAGER"
              items={users}
              value={selectedUser}
              onSelect={val => setSelectedUser(val)}
              renderLeftIcon={() => (
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {currentUserObj?.initials}
                  </Text>
                </View>
              )}
            />

            {/* TEAM MEMBERS CHIP UI */}
            <View style={styles.teamContainer}>
              <Text style={styles.teamtxt}>TEAM MEMBERS</Text>
              <View style={styles.chipRow}>
                {users.map(item => (
                  <View key={item.value} style={styles.chip}>
                    <View
                      style={[
                        styles.chipAvatar,
                        { backgroundColor: item.color  },
                      ]}
                    >
                      <Text style={styles.chipAvatarText}>{item.initials}</Text>
                    </View>

                    <Text style={styles.chipName}>
                      {item.name || item.label}
                    </Text>

                    <TouchableOpacity
                      onPress={() => handleRemoveUser(item.value)}
                    >
                      <Icon
                        name="close-outline"
                        size={spacing.msixteen}
                        color={colors.MutedSlateGray}
                      />
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Add Button */}
                <TouchableOpacity style={styles.addButton}>
                  <Icon
                    name="person-add-outline"
                    size={spacing.mfourteen}
                    color={colors.primary}
                  />
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.btnContainer}>
              <CustomButton
                title="Cancel"
                onPress={handleCancel}
                disabledtxt={styles.distxt}
                style={styles.btn}
                button={styles.Button}
              />
              <CustomButton
                title="Save Changes"
                textStyle={styles.txtbtn}
                style={styles.btn}
                onPress={handleSave}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProjectScreen;

const styles = StyleSheet.create({
  main: {
    flex: spacing.a,
    backgroundColor: colors.white,
  },
  keyboardContainer: {
    flex: spacing.a,
  },
  scrollContent: {
    flexGrow: spacing.a,
    paddingBottom: spacing.vtwentyFour,
  },
  formContainer: {
    paddingHorizontal: spacing.hsixteen,
    rowGap: spacing.registerGap,
  },
  tabSwitchContainer: {
    marginTop: spacing.vtwo,
    paddingHorizontal: spacing.hfour,
    zIndex: spacing.zIndexBase,
  },
  tabSwitcher: {
    marginTop: spacing.veight,
    paddingHorizontal: spacing.heights,
    justifyContent: 'center',
  },
  tabswitchertext: {
    color: colors.MutedSlateGray,
    fontSize: spacing.mthirteen,
  },
  pill: {
    paddingHorizontal: spacing.htwelve,
    paddingVertical: spacing.hfive,
  },

  avatar: {
    width: spacing.hTwentyEight,
    height: spacing.hTwentyEight,
    borderRadius: spacing.mfourteen,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.heights,
  },
  avatarText: {
    color: colors.white,
    fontSize: spacing.meleven,
    fontWeight: '700',
  },
  teamContainer: {
    marginTop: spacing.vtwo,
  },
  teamtxt: {
    fontSize: spacing.mtwelve,
    color: colors.MutedSlateGray,
    fontWeight: '600',
    marginBottom: spacing.veight,
    letterSpacing: spacing.aa,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.heights,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.Slate100,
    borderRadius: spacing.mtwenty,
    paddingVertical: spacing.vfour,
    paddingLeft: spacing.hfour,
    paddingRight: spacing.hten,
  },
  chipAvatar: {
    width: spacing.hTwentyEight,
    height: spacing.hTwentyEight,
    borderRadius: spacing.mfourteen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.hsix,
  },
  chipAvatarText: {
    color: colors.white,
    fontSize: spacing.meleven,
    fontWeight: '700',
  },
  chipName: {
    fontSize: spacing.mthirteen,
    fontWeight: '600',
    color: colors.VeryDarkSlateBlue,
    marginRight: spacing.hsix,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: spacing.borderThin,
    borderColor: colors.LightSlateGray,
    borderStyle: 'dashed',
    borderRadius: spacing.mtwenty,
    paddingVertical: spacing.vsix,
    paddingHorizontal: spacing.hfourteen,
    gap: spacing.hfour,
  },
  addText: {
    fontSize: spacing.mthirteen,
    fontWeight: '600',
    color: colors.primary,
  },
  btnContainer: {
    paddingTop: spacing.vtwentyFour,
    flexDirection: 'row',
    justify: 'space-between',
    gap: spacing.htwelve,
  },
  distxt: {
    color: colors.black,
  },
  btn: {
    flex: spacing.a,
    color:colors.white,
  },
  Button:{
    backgroundColor:colors.LightGray
  },
  txtbtn: {
    fontSize: spacing.mthirteen,
    fontFamily: Fonts.Bold,
  },
});
