import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useCommon } from '../context';
import Login from '../screens/auth/login/Login';
import Signup from '../screens/auth/signup/Signup';
import Home from '../screens/home/Home';

const Screens = ({ }) => {

    const Stack = createNativeStackNavigator();
    const { isLoggedIn } = useCommon()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login} options={{ headerShown: true }} />
                <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Screens