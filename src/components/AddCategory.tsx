import { Icon, Input, ListItem, Overlay } from '@rneui/themed'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import config from '../../config'
import categoryIcons from '../lib/categoryIcons'
import { getLoginDetails } from '../lib/storage'
import CommonHeader from './CommonHeader'



const AddCategory = ({ navigation }: any) => {
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')
    const [iconSetExpanded, setIconSetExpanded] = useState<boolean>(false)
    const [selectedIcon, setSelectedIcon] = useState(categoryIcons[0])

    const onIconPress = (icon: { icon_name: string, icon_type: string }) => {
        setSelectedIcon(icon)
        toggleCategoriesOverlay()
    }

    const toggleCategoriesOverlay = () => {
        setIconSetExpanded(!iconSetExpanded)
    }

    const onAddItemPress = async () => {
        setNameError('')

        if (name.length < 2) {
            setNameError('Name should have atleast two characters')
            return
        }

        if (!selectedIcon) {
            Alert.alert('Icon cannot be empty')
            return
        }

        try {
            const loginDetails = await getLoginDetails()

            if ('login_token' in loginDetails) {
                if (loginDetails['login_token'] != null) {

                    const response = await fetch(
                        `${config.API_URL}/detail/categories/`,
                        {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${loginDetails['login_token']}`
                            },
                            body: JSON.stringify({
                                "name": name,
                                "icon_name": selectedIcon.icon_name,
                                "icon_type": selectedIcon.icon_type
                            })
                        }
                    )
                    const json = await response.json();

                    if (json.hasOwnProperty('non_field_errors')) {
                        Alert.alert('Error', json.non_field_errors[0])
                    }
                }
            } else {
                Alert.alert('Error', 'Please login again')
            }

            navigation.navigate('CategoryList')
        } catch (error) {
            console.error(error);
        }

        navigation.navigate('CategoryList')
    }

    return (
        <View style={styles.container}>
            <CommonHeader heading="Add Category" />
            <Input
                placeholder="Name"
                leftIcon={{ type: 'material-icons', name: 'category' }}
                onChangeText={setName}
                errorMessage={nameError}
            />

            <TouchableOpacity onPress={toggleCategoriesOverlay}>
                <Input
                    placeholder={selectedIcon.icon_name}
                    leftIcon={{ type: selectedIcon.icon_type, name: selectedIcon.icon_name }}
                    onChangeText={() => console.log('Icon selected')}
                    disabled
                />
            </TouchableOpacity>

            <Overlay fullScreen={true} isVisible={iconSetExpanded} onBackdropPress={toggleCategoriesOverlay}>
                <ScrollView>
                    {categoryIcons.map((icon, i) => (
                        <ListItem key={i} onPress={() => onIconPress(icon)} bottomDivider>
                            <Icon name={icon.icon_name} type={icon.icon_type} />
                            <ListItem.Content>
                                <ListItem.Title>{icon.icon_name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </Overlay>

            <TouchableOpacity style={styles.button} onPress={onAddItemPress}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddCategory

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
        backgroundColor: '#729343'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})