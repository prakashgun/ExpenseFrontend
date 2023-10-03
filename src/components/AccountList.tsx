import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AccountInterface from '../interfaces/AccountInterface'
import { getAccountsApi } from '../lib/account'
import AccountItem from './AccountItem'
import CommonHeader from './CommonHeader'


const AccountList = ({ navigation }: any) => {
    const [accounts, setAccounts] = useState<AccountInterface[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const loadData = async () => {
        const allAccounts = await getAccountsApi()
        setAccounts(allAccounts)
    }

    useEffect(() => {
        setIsLoading(true)
        loadData()
        setIsLoading(false)
    }, [useIsFocused()])

    return (
        <View style={styles.container}>
            <CommonHeader heading="Accounts" />
            {isLoading ? <ActivityIndicator size="large" color="#3e3b33" /> :
                <ScrollView >
                    {
                        accounts && accounts.map((account) => (
                            <AccountItem
                                account={account}
                                key={account.id}
                                onPress={() => {
                                    return navigation.navigate('AccountScreen', { id: account.id })
                                }}
                            />
                        ))
                    }

                </ScrollView>}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddAccount')}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AccountList

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
        backgroundColor: '#729343',
        margin: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})