import { useIsFocused } from '@react-navigation/native'
import { PricingCard } from '@rneui/themed'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import config from '../../config'
import CategoryInterface from '../interfaces/CategoryInterface'
import { getLoginDetails } from '../lib/storage'
import CommonHeader from './CommonHeader'
import GLOBALS from '../lib/globals'


const CategoryScreen = ({ navigation, route }: any) => {
    const [category, setCategory] = useState<CategoryInterface>()

    useEffect(() => {
        getCategoryApi()
    }, [useIsFocused()])

    const getCategoryApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/detail/categories/${route.params.id}`,
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
                    setCategory(json)

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
            'Delete this category and all associated records ?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteCategoryApi()
                }
            ]
        )
    }

    const deleteCategoryApi = async () => {

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/detail/categories/${route.params.id}`,
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

        navigation.navigate('CategoryList')
    }

    return (
        <View style={styles.container}>
            <CommonHeader heading="Category Detail" />
            <ScrollView >
                {
                    category &&
                    <PricingCard
                        color={GLOBALS.color.main}
                        title={category.name}
                        button={{ title: 'Delete Category', onPress: () => onDeleteItemPress(), color: GLOBALS.color.delete }}
                    />
                }

            </ScrollView>
        </View>
    )
}

export default CategoryScreen

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
        backgroundColor: GLOBALS.color.main
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})