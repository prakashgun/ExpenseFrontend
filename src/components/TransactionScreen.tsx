import { useIsFocused } from '@react-navigation/native'
import { Icon } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import config from '../../config'
import TransactionInterface from '../interfaces/TransactionInterface'
import { roundCurrency, thousands_separators } from '../lib/currency'
import GLOBALS from '../lib/globals'
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

    const handleDelete = () => {
        Alert.alert(
            'Delete',
            'Delete this transaction and all associated records ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
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
            <CommonHeader heading="Account Detail" />
            <ScrollView >
                {transaction && <View>
                    <View style={styles.details}>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Account:</Text>
                            <Text style={styles.value}>{transaction.account.name}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Category:</Text>
                            <Text style={styles.value}>{transaction.category.name}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Type:</Text>
                            <Text style={styles.value}>{transaction.type}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.label}>Value:</Text>
                            <Text style={styles.value}>{thousands_separators(roundCurrency(transaction.value))}</Text>
                        </View>
                        {transaction.name &&
                            <View style={styles.detailRow}>
                                <Text style={styles.label}>Description:</Text>
                                <Text style={styles.value}>{[`${transaction.name}`]}</Text>
                            </View>}
                        <Icon name="delete" type="ant-design" onPress={handleDelete} color={GLOBALS.color.delete} />
                    </View>
                </View>}
            </ScrollView>
        </View>
    )
}

export default TransactionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    details: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        flex: 1,
        textAlign: 'right',
    },
    deleteButton: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20,
    }
})