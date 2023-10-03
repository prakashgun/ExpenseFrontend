import { Button } from '@rneui/base'
import { Icon, Input, ListItem, Overlay, Text } from '@rneui/themed'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import AccountInterface from '../interfaces/AccountInterface'
import AccountSelectInterface from '../interfaces/AccountSelectInterface'


const AccountSelect = (
    { 
        accounts, selectedAccount, setSelectedAccount, selectedTransactionType = null, isFromAccount = true,
        inputButtonStyle
    }: AccountSelectInterface
    ) => {

    const [accountsExpanded, setAccountsExpanded] = useState<boolean>(false)
    let placeholder = 'Account:'

    if (selectedTransactionType && selectedTransactionType.name) {
        if (selectedTransactionType.name === 'Transfer') {
            placeholder = isFromAccount ? 'From:' : 'To:'
        }
    }

    const toggleAccountsOverlay = () => {
        setAccountsExpanded(!accountsExpanded)
    }

    const onAccountIconPress = (account: AccountInterface) => {
        setSelectedAccount(account)
        setAccountsExpanded(!accountsExpanded)
    }

    return (
        <View style={styles.container}>
            <Button
                onPress={toggleAccountsOverlay}
                title={placeholder + ' ' + selectedAccount.name}
                icon={{ type: "font-awesome", name: "bank", color: 'white' }}
                buttonStyle={inputButtonStyle}
            />
            <Overlay fullScreen={true} isVisible={accountsExpanded} onBackdropPress={toggleAccountsOverlay}>
                <Text h4>Select Account</Text>
                <ScrollView>
                    {accounts && accounts.map((account, i) => (
                        <ListItem key={i} onPress={() => onAccountIconPress(account)} bottomDivider>
                            <Icon name="bank" type="font-awesome" />
                            <ListItem.Content>
                                <ListItem.Title>{account.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </Overlay>
        </View>
    )
}

export default AccountSelect

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    disabled_input: {
        opacity: 1
    }
})
