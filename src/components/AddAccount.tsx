import { Input } from '@rneui/themed'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import config from '../../config'
import { getLoginDetails } from '../lib/storage'
import CommonHeader from './CommonHeader'


const AddAccount = ({ navigation }: any) => {
    const [name, setName] = useState<string>('')
    const [balance, setBalance] = useState<any>()
    const [note, setNote] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')
    const [balanceError, setBalanceError] = useState<string>('')

    const onAddItemPress = async () => {
        setNameError('')
        setBalanceError('')

        if (name.length < 2) {
            setNameError('Name should have atleast two characters')
            return
        }

        if (!balance) {
            setBalanceError('Account balance cannot be empty')
            return
        }

        const loginDetails = await getLoginDetails()

        if ('login_token' in loginDetails) {
            if (loginDetails['login_token'] != null) {

                const response = await fetch(
                    `${config.API_URL}/detail/accounts/`,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${loginDetails['login_token']}`
                        },
                        body: JSON.stringify({
                            "name": name,
                            "initial_balance": balance,
                            "note": note
                        })
                    }
                )
                const json = await response.json();

                console.log(json)

                if (json.hasOwnProperty('non_field_errors')) {
                    Alert.alert('Error', json.non_field_errors[0])
                }
            }
        } else {
            Alert.alert('Error', 'Please login again')
        }

        navigation.navigate('AccountList')
    }

    return (
        <View style={styles.container}>
            <CommonHeader heading="Add Account" />
            <Input
                placeholder="Name"
                accessibilityLabel="Name"
                leftIcon={{ type: 'font-awesome', name: 'bank' }}
                onChangeText={setName}
                errorMessage={nameError}
            />
            <Input
                placeholder="Balance"
                accessibilityLabel="Balance"
                leftIcon={{ type: 'material-icons', name: 'account-balance-wallet' }}
                keyboardType="numeric"
                onChangeText={setBalance}
                errorMessage={balanceError}
            />
            <Input
                placeholder="Note (Optional)"
                accessibilityLabel="Note"
                leftIcon={{ type: 'font-awesome', name: 'sticky-note' }}
                onChangeText={setNote}
            />
            <TouchableOpacity style={styles.button} onPress={onAddItemPress}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddAccount

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
        alignSelf: 'center',
        backgroundColor: '#729343'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})