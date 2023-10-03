import { useNavigation } from '@react-navigation/native'
import { LinearProgress } from '@rneui/themed'
import React, { useEffect } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { getLoginDetails, setLoggedOut } from '../lib/storage'
import CommonHeader from './CommonHeader'
import config from '../../config'


const Logout = () => {
    const navigation = useNavigation<any>()

    const logoutApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/customer/logout/`,
                        {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${loginDetails['login_token']}`
                            }
                        }
                    )
                    const json = await response.json();

                    if (json.hasOwnProperty('non_field_errors')) {
                        Alert.alert('Error', json.non_field_errors[0])
                    }
                }
            }

            setLoggedOut()
            navigation.navigate('WelcomeScreen')
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        logoutApi()
    }, [])

    return (
        <View style={styles.container}>
            <CommonHeader heading="Logout" />
            <LinearProgress style={{ marginVertical: 10 }} color="#729343" />
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        width: '88%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    login: {
        backgroundColor: '#096A2E'
    },
    register: {
        backgroundColor: '#729343'
    }
})