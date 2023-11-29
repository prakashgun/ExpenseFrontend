import CalendarPicker from 'react-native-calendar-picker'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import TransactionInterface from '../interfaces/TransactionInterface'
import { getTransactionsApi } from '../lib/transaction'
import CommonHeader from './CommonHeader'
import DatePanel from './DatePanel'
import TransactionItem from './TransactionItem'
import GLOBALS from '../lib/globals'


const TransactionList = ({ navigation }: any) => {
    const [transactions, setTransactions] = useState<TransactionInterface[]>([])
    const [transactionDate, setTransactionDate] = useState<Date>(new Date())
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)

    const loadData = async (date: Date) => {
        try {
            setIsLoading(true)
            const allTransactions = await getTransactionsApi(date)
            setTransactions(allTransactions);
        } catch (error) {
            Alert.alert('Error', 'Failed to load transactions. Please check your internet connection and try again.')
        } finally {
            setIsLoading(false)
        }
    }
    

    const onDateChange = (selectedDate?: any) => {
        try {
            if (!selectedDate) return;
            const newTransactionDate = new Date(selectedDate);
            if (!isNaN(newTransactionDate.getTime())) {
                setTransactionDate(newTransactionDate);
                setShowDatePicker(false);
            } else {
                // Handle invalid date
                console.error('Invalid date');
            }
        } catch (error) {
            // Handle other errors
            console.error('Error in onDateChange:', error);
        }
    }

    const handleDateDecrease = () => {
        setTransactionDate(new Date(transactionDate.getTime() - 24 * 60 * 60 * 1000));
    }
    
    const handleDateIncrease = () => {
        setTransactionDate(new Date(transactionDate.getTime() + 24 * 60 * 60 * 1000));
    }

    useEffect(() => {
            loadData(transactionDate)
    }, [transactionDate, useIsFocused()])

    return (
        <View style={styles.container}>
            <CommonHeader heading="Transactions" />

            {showDatePicker && (
                 <CalendarPicker
                 onDateChange={onDateChange}
               />
            )}

            <View>
                <DatePanel
                    date={transactionDate}
                    onDateDecrease={handleDateDecrease}
                    onDateIncrease={handleDateIncrease}
                    setShowDatePicker={setShowDatePicker}
                />
            </View>

                <ScrollView >
            {isLoading ? <ActivityIndicator size="large" color="#3e3b33" /> :
                <View>
                    {
                        transactions && transactions.map((transaction) => (
                            <TransactionItem
                                transaction={transaction}
                                key={transaction.id}
                                onPress={() => {
                                    return navigation.navigate('TransactionScreen', { id: transaction.id })
                                }}
                            />
                        ))
                    }
                    </View>}
                </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddTransaction', { transactionDate: transactionDate.toISOString() })}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TransactionList

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
        backgroundColor: GLOBALS.color.main,
        marginBottom: 30
    },
    buttonText: {       
        color: '#fff',
        fontWeight: 'bold'
    }
})