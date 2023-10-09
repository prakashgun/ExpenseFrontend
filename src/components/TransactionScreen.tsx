import { useIsFocused } from '@react-navigation/native'
import { PricingCard } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import config from '../../config'
import TransactionInterface from '../interfaces/TransactionInterface'
import { getCurrentBalance, roundCurrency, thousands_separators } from '../lib/currency'
import { getLoginDetails } from '../lib/storage'
import CommonHeader from './CommonHeader'


const TransactionScreen = ({ navigation, route }: any) => {
    const [transaction, setTransaction] = useState<TransactionInterface>()

    useEffect(() => {
        getTransactionApi()
    }, [useIsFocused()])

    const getTransactionApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/detail/transactions/${route.params.id}`,
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
                    setTransaction(json)

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
            'Delete this transaction and all associated records ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteTransactionApi()
                }
            ]
        )
    }

    const deleteTransactionApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/detail/transactions/${route.params.id}`,
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

        navigation.navigate('TransactionList')
    }

    return (
        <View style={styles.container}>
            <CommonHeader heading="Transaction Detail" />
            <ScrollView >
                {
                    transaction &&
                    <PricingCard
                        color="#729343"
                        title={transaction.category.name}
                        info={[`${transaction.category.name}`, `${transaction.name}`]}
                        price={thousands_separators(roundCurrency(transaction.value))}
                        button={{ title: 'Delete Transaction', onPress: () => onDeleteItemPress(), color:'#ff0000' }}
                    />
                }

            </ScrollView>
        </View>
    )
}

export default TransactionScreen

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