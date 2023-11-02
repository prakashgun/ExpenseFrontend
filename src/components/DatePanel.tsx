import { Icon } from '@rneui/base'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import GLOBALS from '../lib/globals'

const DatePanel = ({ date, onDateDecrease, onDateIncrease }: any) => {
    const formattedDate = date.toLocaleDateString(undefined, { "day": "numeric", "month": "short", "year": "numeric" })

    return (
        <View style={styles.datePanel}>
            <TouchableOpacity onPress={onDateDecrease}>
                <Icon name="caretleft" type="ant-design" onPress={onDateDecrease} color={GLOBALS.color.main} />
            </TouchableOpacity>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <TouchableOpacity onPress={onDateIncrease}>
                <Icon name="caretright" type="ant-design" onPress={onDateIncrease} color={GLOBALS.color.main} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    datePanel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 20,
    },
});

export default DatePanel
