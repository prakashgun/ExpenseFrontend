import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const WelcomeScreen = () => {
    const navigation = useNavigation<any>()

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* <Text style={styles.title}>Kehi Expense Tracker</Text> */}
                <Image source={require('../assets/images/logo.png')} style={styles.image} />
                <Text style={styles.desc}>{'Expense tracking made easy,\n at your fingertips.'}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.login]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.register]} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#8A2BE2',
        fontWeight: 'bold',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 60,
        marginTop: 39,
    },
    desc: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 30,
        color: '#808080'
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        marginHorizontal: 30,
        justifyContent: 'space-around'
    },
    button: {
        width: '48%',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    login: {
        backgroundColor: '#096A2E'
    },
    register: {
        backgroundColor: '#729343'
    }
});

export default WelcomeScreen;