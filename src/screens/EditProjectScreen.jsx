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
import { s, vs, ms } from 'react-native-size-matters';

const EditProjectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const project = route.params?.project || {};
  const [activeTab, setActiveTab] = useState('Low');
  const [selectedUser, setSelectedUser] = useState('1');
  const users = [
    { label: 'Alex Chen', value: '1', initials: 'AC', color: colors.primary },
    { label: 'Sarah Jenkins', value: '2', initials: 'SJ', color: colors.secondary },
    { label: 'Mike', value: '3', initials: 'MR', color: colors.LowGreenText },
    { label: 'Emma', value: '4', initials: 'ED', color: colors.HighAmberText },
  ];

  const currentUserObj = users.find(u => u.value === selectedUser);

  const handleSave = () => {
    navigation.replace('ProjectDetails', { project });
  };

  const handleRemoveUser = userId => {
    // Logic for removing user
  };

  return (
    <SafeAreaView style={styles.main}>
      <ProjectsHeader
        showBack
        title="Edit Project"
        isDestructive
        rightIcon="trash-outline"
      />
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
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
                        { backgroundColor: item.color || colors.primary },
                      ]}
                    >
                      <Text style={styles.chipAvatarText}>{item.initials}</Text>
                    </View>

                    <Text style={styles.chipName}>
                      {item.name || item.label}
                    </Text>

                    <TouchableOpacity
                      onPress={() => handleRemoveUser(item.value)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Icon
                        name="close-outline"
                        size={ms(16)}
                        color={colors.MutedSlateGray}
                      />
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Add Button */}
                <TouchableOpacity style={styles.addButton}>
                  <Icon
                    name="person-add-outline"
                    size={ms(14)}
                    color={colors.primary}
                  />
                  <Text style={styles.addText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.btnContainer}>
              <CustomButton
                title="Cancel"
                disabled
                disabledtxt={styles.distxt}
                style={styles.btn}
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
    paddingBottom: vs(24),
  },
  formContainer: {
    paddingHorizontal: s(16),
    rowGap: vs(12),
  },
  tabSwitchContainer: {
    marginTop: vs(8),
    paddingHorizontal: s(4),
    zIndex: 1,
  },
  tabSwitcher: {
    marginTop: vs(8),
    paddingHorizontal: s(8),
    justifyContent: 'center',
  },
  tabswitchertext: {
    color: colors.MutedSlateGray,
    fontSize: ms(13),
  },
  pill: {
    paddingHorizontal: s(16),
  },
  avatar: {
    width: s(28),
    height: s(28),
    borderRadius: ms(14),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(8),
  },
  avatarText: {
    color: colors.white,
    fontSize: ms(11),
    fontWeight: '700',
  },
  teamContainer: {
    marginTop: vs(12),
  },
  teamtxt: {
    fontSize: ms(12),
    color: colors.MutedSlateGray,
    fontWeight: '600',
    marginBottom: vs(8),
    letterSpacing: 0.5,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: s(8),
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.Slate100,
    borderRadius: ms(20),
    paddingVertical: vs(4),
    paddingLeft: s(4),
    paddingRight: s(10),
  },
  chipAvatar: {
    width: s(28),
    height: s(28),
    borderRadius: ms(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(6),
  },
  chipAvatarText: {
    color: colors.white,
    fontSize: ms(11),
    fontWeight: '700',
  },
  chipName: {
    fontSize: ms(13),
    fontWeight: '600',
    color: colors.VeryDarkSlateBlue,
    marginRight: s(6),
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.LightSlateGray,
    borderStyle: 'dashed',
    borderRadius: ms(20),
    paddingVertical: vs(6),
    paddingHorizontal: s(14),
    gap: s(4),
  },
  addText: {
    fontSize: ms(13),
    fontWeight: '600',
    color: colors.primary,
  },
  btnContainer: {
    paddingTop: vs(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: s(12),
  },
  distxt: {
    color: colors.black,
  },
  btn: {
    flex: spacing.a,
  },
  txtbtn: {
    fontSize: ms(13),
    fontFamily: Fonts.Bold,
  },
});