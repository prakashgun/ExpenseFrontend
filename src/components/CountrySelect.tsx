import { Button } from '@rneui/base'
import { Icon, ListItem, Overlay } from '@rneui/themed'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import CountryInterface from '../interfaces/CountryInterface'
import CountrySelectInterface from '../interfaces/CountrySelectInterface'


const CountrySelect = (
    {
        countries, selectedCountry, setSelectedCountry, 
        inputButtonStyle
    }: CountrySelectInterface
) => {

    const [countriesExpanded, setCountriesExpanded] = useState<boolean>(false)
    let placeholder = ''

    const toggleCountriesOverlay = () => {
        setCountriesExpanded(!countriesExpanded)
    }

    const onCountryIconPress = (country: CountryInterface) => {
        setSelectedCountry(country)
        setCountriesExpanded(!countriesExpanded)
    }

    return (
        <View style={styles.container}>
            <Button
                onPress={toggleCountriesOverlay}
                title={placeholder + ' ' + selectedCountry.name + ` (${selectedCountry.dialCode})`}
                // icon={{ type: "font-awesome", name: "flag", color: 'white' }}
                buttonStyle={inputButtonStyle}
            />
            <Overlay overlayStyle={styles.overlay} isVisible={countriesExpanded} onBackdropPress={toggleCountriesOverlay}>
                <ScrollView style={styles.scrollView}>
                    {countries && countries.map((country, i) => (
                        <ListItem key={i} onPress={() => onCountryIconPress(country)} bottomDivider>
                            {/* <Icon name="bank" type="font-awesome" /> */}
                            <ListItem.Content>
                                <ListItem.Title>{country.name} ({country.dialCode})</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </ScrollView>
            </Overlay>
        </View>
    )
}

export default CountrySelect

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
