import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const EditProjectScreen = () => {
  const navigation= useNavigation();
  const route = useRoute();
  const project = route.params?.project || {};
  const [activeTab, setActiveTab] = useState('Low');
  const [selectedUser, setSelectedUser] = useState('1');
  const users = [
    { label: 'Alex Chen', value: '1', initials: 'AC', color: '#2563EB' },
    { label: 'Sarah Jenkins', value: '2', initials: 'SJ', color: '#8B5CF6' },
    { label: 'Mike', value: '3', initials: 'MR', color: '#10B981' },
    { label: 'Emma', value: '4', initials: 'ED', color: '#F59E0B' },
  ];

  const currentUserObj = users.find(u => u.value === selectedUser);

  const handleSave= () =>{
    navigation.replace("ProjectDetails",{project});
  }

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <ProjectsHeader showBack title="Edit Project" isDestructive  rightIcon="trash-outline"/>
        <View style={styles.formContainer}>
          <Input
            label="PROJECT NAME"
            placeholder={project.title}
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
                      { backgroundColor: item.color || '#2563EB' },
                    ]}
                  >
                    <Text style={styles.chipAvatarText}>{item.initials}</Text>
                  </View>

                  <Text style={styles.chipName}>{item.name || item.label}</Text>

                  <TouchableOpacity
                    onPress={() => handleRemoveUser(item.value)}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <Icon name="close-outline" size={16} color="#64748B" />
                  </TouchableOpacity>
                </View>
              ))}

              {/* Add Button */}
              <TouchableOpacity style={styles.addButton}>
                <Icon name="person-add-outline" size={14} color="#2563EB" />
                <Text style={styles.addText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
              <View style={styles.btnContainer}>
                <CustomButton title="Cancel" disabled disabledtxt={styles.distxt} style={styles.btn} />
                  <CustomButton title="Save Changes" textStyle={styles.txtbtn}   style={styles.btn} onPress={handleSave} />
              </View>


        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProjectScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formContainer: {
    paddingHorizontal: '5%',
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
    color: '#64748B',
    fontSize: 13,
  },
  pill: {
    paddingHorizontal: '8%',
  },
  teamtxt: {
    fontSize: 12,
    color: '#64748B',
  },
  teamContainer: {
    marginTop: 12,
  },
  teamtxt: {
    fontSize: 12,
    color: '#8E99A6',
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingVertical: 4,
    paddingLeft: 4,
    paddingRight: 10,
  },
  chipAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  chipAvatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  chipName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A', // Dark text color for high contrast
    marginRight: 6,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 4,
  },
  addText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  btnContainer:{
    paddingVertical:"10%",
    flexDirection:"row",
    justifyContent:"space-evenly"
  },

  distxt:{
    color:colors.black,
  },btn:{
    width:"40%",
    
  },txtbtn:{
    fontSize:13,
    fontFamily:Fonts.Bold,
  }
});
