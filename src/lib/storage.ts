import AsyncStorage from '@react-native-async-storage/async-storage'

export const setLoginDetails = async (json:any) => {
    await AsyncStorage.setItem('login_token', json.token)
    await AsyncStorage.setItem('user', JSON.stringify(json.user))
}

export const setLoggedOut = async () => {
    await AsyncStorage.removeItem('login_token')
    await AsyncStorage.removeItem('user')
}

export const getLoginDetails = async () => {
    const user = await AsyncStorage.getItem('user')

    return {
        'login_token': await AsyncStorage.getItem('login_token'),
        'user': user != null ? JSON.parse(user) : null
    }
}