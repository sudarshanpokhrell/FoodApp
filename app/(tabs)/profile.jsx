import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'
const profile = () => {
  return (<>
 
    <View>
      <Text>profile</Text>
      
    </View>
    <TouchableOpacity onPress={() => router.push('/profile-card')}>
      <Text>Go to task</Text>
    </TouchableOpacity>

  </>
  )
}

export default profile