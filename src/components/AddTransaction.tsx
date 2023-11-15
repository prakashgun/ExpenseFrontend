import { useIsFocused } from '@react-navigation/native'
import { Input } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import config from '../../config'
import AccountInterface from '../interfaces/AccountInterface'
import CategoryInterface from '../interfaces/CategoryInterface'
import TransactionTypeInterface, { transactionTypes } from '../interfaces/TransactionTypeInterface'
import { getAccountsApi } from '../lib/account'
import { getCategoriesApi } from '../lib/category'
import { getLoginDetails } from '../lib/storage'
import AccountSelect from './AccountSelect'
import CategorySelect from './CategorySelect'
import CommonHeader from './CommonHeader'
import TransactionTypeSelect from './TransactionTypeSelect'
import { addTransactionApi } from '../lib/transaction'
import GLOBALS from '../lib/globals'


const AddTransaction = ({ navigation, route }: any) => {
    const [name, setName] = useState<string>('')
    const [value, setValue] = useState<any>()
    const [valueError, setValueError] = useState<string>('')
    const transactionDate: Date = new Date(route.params.transactionDate)
    const [selectedAccount, setSelectedAccount] = useState<AccountInterface>()
    const [accounts, setAccounts] = useState<AccountInterface[]>()
    const [selectedToAccount, setSelectedToAccount] = useState<AccountInterface>()
    const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionTypeInterface>(transactionTypes[0])
    const [selectedCategory, setSelectedCategory] = useState<CategoryInterface>()
    const [categories, setCategories] = useState<CategoryInterface[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)


    const loadFormData = async () => {
        const allAccounts = await getAccountsApi()
        setAccounts(allAccounts)
        const allCategories = await getCategoriesApi()
        setCategories(allCategories)

        if (allAccounts && !selectedAccount) {
            setSelectedAccount(allAccounts.at(0))
            setSelectedToAccount(allAccounts.at(-1))
        }

        if (allCategories && !selectedCategory) {
            setSelectedCategory(allCategories.at(0))
        }
    }

    useEffect(() => {
        setIsLoading(true)
        loadFormData()
        setIsLoading(false)
    }, [useIsFocused()])

    const onAddItemPress = async () => {
        setValueError('')

        if (!value) {
            setValueError('Value cannot be empty')
            return
        }

        if (!selectedAccount) {
            Alert.alert('Account must be selected')
            return
        }

        if (!selectedCategory) {
            Alert.alert('Category must be selected')
            return
        }

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const json = await addTransactionApi({
                        "name": name,
                        "value": value,
                        "type": selectedTransactionType.name,
                        "is_income": (selectedTransactionType.name === 'Income') ? true : false,
                        "account_id": selectedAccount.id,
                        "category_id": selectedCategory.id,
                        "transaction_date": transactionDate
                    })

                    // TODO: Fix the 400 error when adding string to value
                    
                    if (json.hasOwnProperty('non_field_errors')) {
                        Alert.alert('Error', json.non_field_errors[0])
                    }

                    if (selectedTransactionType.name === 'Transfer') {

                        if (!selectedToAccount) {
                            Alert.alert('To Account must be selected')
                            return
                        }

                        if (selectedAccount === selectedToAccount) {
                            Alert.alert('From and To Account cannot be the same')
                            return
                        }

                        if (!json.hasOwnProperty('id')) {
                            Alert.alert('Error', 'Server error. Cannot get from transaction')
                        }

                        const transactionAddJson = await addTransactionApi({
                            "name": name,
                            "value": value,
                            "type": selectedTransactionType.name,
                            "is_income": true,
                            "account_id": selectedToAccount.id,
                            "category_id": selectedCategory.id,
                            "transfer_id": json.id,
                            "transaction_date": transactionDate
                        })

                        if (transactionAddJson.hasOwnProperty('non_field_errors')) {
                            Alert.alert('Error', transactionAddJson.non_field_errors[0])
                        }
                    }
                }
            } else {
                Alert.alert('Error', 'Please login again')
            }

            navigation.navigate('TransactionList')
        } catch (error) {
            console.error(error);
        }

        navigation.navigate('TransactionList', {}, {forceRefresh:true})
    }

    return (
        <View>
            <CommonHeader heading="Add Transaction" />
            {isLoading ? <ActivityIndicator size="large" color="#3e3b33" /> :
                <View>
                    {transactionTypes && selectedTransactionType &&
                        <TransactionTypeSelect
                            transactionTypes={transactionTypes}
                            selectedTransactionType={selectedTransactionType}
                            setSelectedTransactionType={setSelectedTransactionType}
                            inputButtonStyle={styles.inputButtonStyle}
                        />}
                    {categories && selectedCategory && <CategorySelect
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        inputButtonStyle={styles.inputButtonStyle}
                    />}
                    {accounts && selectedAccount && selectedTransactionType &&
                        <AccountSelect
                            accounts={accounts}
                            selectedAccount={selectedAccount}
                            setSelectedAccount={setSelectedAccount}
                            selectedTransactionType={selectedTransactionType}
                            isFromAccount={true}
                            inputButtonStyle={styles.inputButtonStyle}
                        />}
                    {accounts && selectedToAccount && selectedTransactionType && selectedTransactionType.name === 'Transfer' &&
                        <AccountSelect
                            accounts={accounts}
                            selectedAccount={selectedToAccount}
                            setSelectedAccount={setSelectedToAccount}
                            selectedTransactionType={selectedTransactionType}
                            isFromAccount={false}
                            inputButtonStyle={styles.inputButtonStyle}
                        />}
                    <Input
                        placeholder="Value"
                        leftIcon={{ type: 'material-icons', name: 'account-balance-wallet' }}
                        keyboardType="numeric"
                        onChangeText={setValue}
                        errorMessage={valueError}
                    />
                    <Input
                        placeholder="Note (Optional)"
                        leftIcon={{ type: 'font-awesome', name: 'sticky-note' }}
                        onChangeText={setName}
                    />
                    <TouchableOpacity style={styles.button} onPress={onAddItemPress}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>}
        </View>
    )
}

export default AddTransaction

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {},
    disabled_input: {
        opacity: 1
    },
    inputButtonStyle: {
        backgroundColor: "olive",
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 5,
        padding: 5
    },
    button: {
        width: '88%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: GLOBALS.color.main
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})
