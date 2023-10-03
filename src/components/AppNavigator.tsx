import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from './WelcomeScreen'

const Stack = createNativeStackNavigator()


const AppNavigator = () => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn && <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />}

        </Stack.Navigator>
        </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})