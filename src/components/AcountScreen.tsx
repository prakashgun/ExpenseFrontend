import { useIsFocused } from '@react-navigation/native'
import { PricingCard } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import config from '../../config'
import AccountInterface from '../interfaces/AccountInterface'
import { getCurrentBalance, roundCurrency, thousands_separators } from '../lib/currency'
import { getLoginDetails } from '../lib/storage'
import CommonHeader from './CommonHeader'


const AccountScreen = ({ navigation, route }: any) => {
    const [account, setAccount] = useState<AccountInterface>()

    useEffect(() => {
        getAccountApi()
    }, [useIsFocused()])

    const getAccountApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/detail/accounts/${route.params.id}`,
                        {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${loginDetails['login_token']}`
                            }
                        }
                    )
                    const json = await response.json();
                    setAccount(json)

                    if (json.hasOwnProperty('non_field_errors')) {
                        Alert.alert('Error', json.non_field_errors[0])
                    }
                }
            } else {
                Alert.alert('Error', 'Please load again')
            }
        } catch (error) {
            console.error(error);
        }
    }

    const onDeleteItemPress = () => {
        Alert.alert(
            'Delete',
            'Delete this account and all associated records ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteAccountApi()
                }
            ]
        )
    }

    const deleteAccountApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/detail/accounts/${route.params.id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${loginDetails['login_token']}`
                            }
                        }
                    )
                }
            } else {
                Alert.alert('Error', 'Please load again')
            }
        } catch (error) {
            console.error(error);
        }

        navigation.navigate('AccountList')
    }

    return (
        <View style={styles.container}>
            <CommonHeader heading="Account Detail" />
            <ScrollView >
                {
                    account &&
                    <PricingCard
                        color="#729343"
                        title={account.name}
                        info={[`${account.note}`]}
                        price={thousands_separators(roundCurrency(getCurrentBalance(account)))}
                        button={{ title: 'Delete Account', onPress: () => onDeleteItemPress(), color:'#ff0000' }}
                    />
                }

            </ScrollView>
        </View>
    )
}

export default AccountScreen

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