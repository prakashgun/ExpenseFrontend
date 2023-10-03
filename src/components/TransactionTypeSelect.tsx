import { Button, FAB, Icon, ListItem, Overlay, Text } from '@rneui/themed'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import TransactionTypeInterface from '../interfaces/TransactionTypeInterface'
import TransactionTypeSelectInterface from '../interfaces/TransactionTypeSelectInterface'


const TransactionTypeSelect = ({
    transactionTypes, selectedTransactionType, setSelectedTransactionType, inputButtonStyle
}: TransactionTypeSelectInterface) => {

    const [transactionTypesExpanded, setTransactionTypesExpanded] = useState<boolean>(false)

    const toggleTransactionTypesOverlay = () => {
        setTransactionTypesExpanded(!transactionTypesExpanded)
    }

    const onTransactionTypeIconPress = (transactionType: TransactionTypeInterface) => {
        setSelectedTransactionType(transactionType)
        setTransactionTypesExpanded(!transactionTypesExpanded)
    }

    return (
        <View style={styles.container}>
            <Button
            buttonStyle={inputButtonStyle}
                onPress={toggleTransactionTypesOverlay}
                title={`${selectedTransactionType.name}`}
                icon={{ type: selectedTransactionType.icon_type, name: selectedTransactionType.icon_name, color: 'white' }}
            />
            <Overlay 
                fullScreen={true} 
                isVisible={transactionTypesExpanded} 
                onBackdropPress={toggleTransactionTypesOverlay}
                >
                <Text h4>Select Type</Text>
                <ScrollView>
                    {transactionTypes && transactionTypes.map((type, i) => (
                        <ListItem key={i} onPress={() => onTransactionTypeIconPress(type)} bottomDivider>
                            <Icon name={type.icon_name} type={type.icon_type} />
                            <ListItem.Content>
                                <ListItem.Title>{type.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </Overlay>
        </View>
    )
}

export default TransactionTypeSelect

const styles = StyleSheet.create({
    container: {
        padding: 5
    }
})
