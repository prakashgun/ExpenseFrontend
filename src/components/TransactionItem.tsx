import { Icon, ListItem } from '@rneui/base'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import TransactionItemInterface from '../interfaces/TransactionItemInterface'
import { thousands_separators } from '../lib/currency'


const TransactionItem = ({ transaction, onPress }: TransactionItemInterface) => (
    <TouchableOpacity onPress={onPress}>
        <ListItem
            key={transaction.id}
            bottomDivider
        >
            {
                (transaction.id === transaction.from_transaction?.id
                    || transaction.id === transaction.to_transaction?.id) &&
                <Icon name="bank-transfer" type="material-community" />
            }
            <Icon
                name={(transaction.is_income) ? 'attach-money' : 'money-off'}
                type="material-icons"
            />
            <ListItem.Content>
                <ListItem.Title>{transaction.category.name}</ListItem.Title>
                {transaction.name.trim() !== '' && <ListItem.Subtitle>{transaction.name}</ListItem.Subtitle>}
            </ListItem.Content>
            <ListItem.Content right>
                <ListItem.Title style={{ color: (transaction.is_income) ? 'green' : 'red' }}>
                    {thousands_separators(transaction.value)}
                </ListItem.Title>
                <ListItem.Subtitle>{transaction.account.name}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    </TouchableOpacity>
)

export default TransactionItem