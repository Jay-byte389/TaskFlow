import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProjectsHeader from "../components/ProjectsHeaer";
const EditProjectScreen = () => {
  return (
    <SafeAreaView>
    <View>
      <ProjectsHeader showBack title='Edit Project' isDestructive />
    </View>
    </SafeAreaView>
  )
}

export default EditProjectScreen

const styles = StyleSheet.create({})