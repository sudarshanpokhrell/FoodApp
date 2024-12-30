import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native'

const task = () => {
  return (
    <SafeAreaView>
    <View>
      <Text>task</Text>
    </View>
    <Link href ='/guess'> 
    <Text>
    Guess The Number
    </Text>
    </Link>
    </SafeAreaView>
  )
}

export default task