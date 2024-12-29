import React from 'react'
import { View, Text, StyleSheet,Image } from 'react-native';
import { Link } from 'expo-router';
const Task = () => {
  return (
     <View style={styles.content}>
            <Text style={styles.title}>Fun & Win Games</Text>
        
            <Link href="/task/guess" style={styles.link}>
            <Image
        source={require("../../../assets/guess.png")} 
        style={styles.image}
      />
            </Link>
            <Link href="/task/quiz" style={styles.link}>
            <Image
        source={require("../../../assets/quiz.png")} 
        style={styles.image}
      />
            </Link>
          </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 16,
      backgroundColor: '#f9f9f9',
      display: 'flex',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingBottom: 16,
      color: '#333',
    },
    link: {
      marginTop: 16,
      alignSelf: 'center',
      color: '#333',
      borderColor: '#D9291A',
      padding: 10,
    },
    linkText: {
      fontSize: 18,
      color: '#F4351A',
      textDecorationLine: 'none',
    },
    image: {
      width: 250,
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
      display: 'flex',
    },
  });

export default Task