import { Button, Input } from '@rneui/themed'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import config from '../../config'
import { setLoginDetails } from '../lib/storage'
import CommonHeader from './CommonHeader'

const VerifyRegister = ({ route, navigation }: any) => {
    const [otp, setOtp] = useState<string>('')
    const [otpError, setOtpError] = useState<string>('')
    const { countryCode, phone } = route.params

    const verifyRegisterApi = async () => {
        setOtpError('')

        if (otp.length < 4) {
            setOtpError('OTP should have at least 4 characters')
            return
        }

        try {
            const response = await fetch(
                `${config.API_URL}/customer/verify-register/`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "country_code": countryCode,
                        "phone": phone,
                        "otp": otp
                    })
                }
            )
            const json = await response.json();

            if (json.hasOwnProperty('non_field_errors')) {
                Alert.alert('Error', json.non_field_errors[0])
            } else {
                await setLoginDetails(json)
                navigation.navigate('TransactionList')
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <CommonHeader heading="Register" />
            <Input
                placeholder='OTP'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={setOtp}
                errorMessage={otpError}
                keyboardType='numeric'
            />

            <Button title="Submit" buttonStyle={styles.button} onPress={verifyRegisterApi} />
        </View>
    )
}

export default VerifyRegister

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button: {
        backgroundColor: '#729343'
    }
})