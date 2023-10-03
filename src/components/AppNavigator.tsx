import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import AccountList from './AccountList'
import AccountScreen from './AcountScreen'
import AddAccount from './AddAccount'
import Login from './Login'
import Logout from './Logout'
import Menu from './Menu'
import Register from './Register'
import TransactionList from './TransactionList'
import VerifyLogin from './VerifyLogin'
import VerifyRegister from './VerifyRegister'
import WelcomeScreen from './WelcomeScreen'
import AddCategory from './AddCategory'
import CategoryList from './CategoryList'
import CategoryScreen from './CategoryScreen'
import AddTransaction from './AddTransaction'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isLoggedIn && <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />}
                <Stack.Screen name="TransactionList" component={TransactionList} />
                <Stack.Screen name="AddTransaction" component={AddTransaction} />
                
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="VerifyRegister" component={VerifyRegister} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="VerifyLogin" component={VerifyLogin} />
                <Stack.Screen name="Logout" component={Logout} />

                <Stack.Screen name="AddAccount" component={AddAccount} />
                <Stack.Screen name="AccountList" component={AccountList} />
                <Stack.Screen name="AccountScreen" component={AccountScreen} />

                <Stack.Screen name="AddCategory" component={AddCategory} />
                <Stack.Screen name="CategoryList" component={CategoryList} />
                <Stack.Screen name="CategoryScreen" component={CategoryScreen} />

                <Stack.Screen name="Menu" component={Menu} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator