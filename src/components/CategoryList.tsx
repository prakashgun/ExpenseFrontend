import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CategoryInterface from '../interfaces/CategoryInterface'
import { getCategoriesApi } from '../lib/category'
import CategoryItem from './CategoryItem'
import CommonHeader from './CommonHeader'


const CategoryList = ({ navigation }: any) => {
    const [categories, setCategories] = useState<CategoryInterface[]>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const loadData = async () => {
        const allCategories = await getCategoriesApi()
        setCategories(allCategories)
    }

    useEffect(() => {
        setIsLoading(true)
        loadData()
        setIsLoading(false)
    }, [useIsFocused()])

    return (
        <View style={styles.container}>
            <CommonHeader heading="Categories" />
            {isLoading ? <ActivityIndicator size="large" color="#3e3b33" /> :
                <ScrollView >
                    {
                        categories && categories.map((category) => (
                            <CategoryItem
                                category={category}
                                key={category.id}
                                onPress={() => {
                                    return navigation.navigate('CategoryScreen', { id: category.id })
                                }}
                            />
                        ))
                    }

                </ScrollView>}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddCategory')}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CategoryList

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