import { useNavigation } from '@react-navigation/native'
import { Header } from '@rneui/themed'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import GLOBALS from '../lib/globals'


const CommonHeader = ({ heading }: any) => {

  const navigation: any = useNavigation()

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Menu')} testID="menu">
      <Header
        leftComponent={{ 'icon': 'menu' }}
        centerComponent={{ text: heading }}
        backgroundColor={GLOBALS.color.main}
      />
    </TouchableOpacity>
  )
}

export default CommonHeader
