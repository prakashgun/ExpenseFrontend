import { Button, Icon, ListItem, Overlay, Text } from '@rneui/themed'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import CategoryInterface from '../interfaces/CategoryInterface'
import CategorySelectInterface from '../interfaces/CategorySelectInterface'


const CategorySelect = ({ categories, selectedCategory, setSelectedCategory, inputButtonStyle }: CategorySelectInterface) => {

    const [categoriesExpanded, setCategoriesExpanded] = useState<boolean>(false)

    const toggleCategoriesOverlay = () => {
        setCategoriesExpanded(!categoriesExpanded)
    }

    const onCategoryIconPress = (category: CategoryInterface) => {
        setSelectedCategory(category)
        setCategoriesExpanded(!categoriesExpanded)
    }

    return (
        <View style={styles.container}>
            <Button
                onPress={toggleCategoriesOverlay}
                title={`${selectedCategory.name}`}
                icon={{ type: selectedCategory.icon_type, name: selectedCategory.icon_name, color: 'white' }}
                buttonStyle={inputButtonStyle}
            />
            <Overlay
                overlayStyle={styles.overlay}
                isVisible={categoriesExpanded}
                onBackdropPress={toggleCategoriesOverlay}>
                <ScrollView style={styles.scrollView}>
                    {categories && categories.map((category, i) => (
                        <ListItem key={i} onPress={() => onCategoryIconPress(category)} bottomDivider>
                            <Icon name={category.icon_name} type={category.icon_type} />
                            <ListItem.Content>
                                <ListItem.Title>{category.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </Overlay>
        </View>
    )
}

export default CategorySelect

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    overlay: {
        height: '75%',
        width: '75%'
    },
    scrollView: {
        width: '100%', // Ensure the ScrollView takes the full width
    }
})
