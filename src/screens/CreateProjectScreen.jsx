import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProjectHeader from "../components/ProjectsHeaer";
import { SafeAreaView } from 'react-native-safe-area-context';
const CreateProjectScreen = () => {
  return (
    <SafeAreaView>
    <View>
        <ProjectHeader showBack title='New Project' />
    </View>
    </SafeAreaView>
  )
}

export default CreateProjectScreen

const styles = StyleSheet.create({})