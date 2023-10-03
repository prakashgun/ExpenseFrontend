import { useNavigation } from '@react-navigation/native'
import { Input } from '@rneui/themed'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CountryInterface from '../interfaces/CountryInterface'
import countries from '../lib/countries'
import CommonHeader from './CommonHeader'
import SearchableCountryPicker from './SearchableCountryPicker'
import config from '../../config'


const Register = () => {
    const navigation = useNavigation<any>()
    const [phone, setPhone] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [phoneError, setPhoneError] = useState<string>('')
    const [firstNameError, setFirstNameError] = useState<string>('')
    const [lastNameError, setLastNameError] = useState<string>('')

    const [selectedCountry, setSelectedCountry] = useState<CountryInterface>({
        name: 'India', code: 'IN', dialCode: '+91'
    });

    const registerApi = async () => {
        setPhoneError('')
        setFirstNameError('')
        setLastNameError('')

        if (phone.length < 5) {
            setPhoneError('Phone number should have at least 5 characters')
            return
        }

        if (!firstName) {
            setFirstNameError('First name cannot be empty')
            return
        }

        if (!lastName) {
            setLastNameError('Last name cannot be empty')
            return
        }

        try {
            const response = await fetch(
                `${config.API_URL}/customer/register/`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "country_code": selectedCountry.dialCode,
                        "phone": phone,
                        "first_name": firstName,
                        "last_name": lastName
                    })
                }
            )
            const json = await response.json();

            if (json.hasOwnProperty('non_field_errors')) {
                Alert.alert('Error', json.non_field_errors[0])
            } else {
                navigation.navigate(
                    'VerifyRegister',
                    {
                        countryCode: selectedCountry.dialCode,
                        phone: phone
                    }
                )
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <CommonHeader heading="Register" />
            <SearchableCountryPicker countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
            <Input
                placeholder='Mobile'
                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                onChangeText={setPhone}
                errorMessage={phoneError}
            />
            <Input
                placeholder='First Name'
                leftIcon={{ type: 'material-icons', name: 'person' }}
                onChangeText={setFirstName}
                errorMessage={firstNameError}
            />
            <Input
                placeholder='Last Name'
                leftIcon={{ type: 'material-icons', name: 'person' }}
                onChangeText={setLastName}
                errorMessage={lastNameError}
            />
            <TouchableOpacity style={[styles.button, styles.register]} onPress={() => registerApi()}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register

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
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    login: {
        backgroundColor: '#096A2E'
    },
    register: {
        backgroundColor: '#729343'
    }
})