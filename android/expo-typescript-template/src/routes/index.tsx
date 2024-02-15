import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useCommon } from '../../App';
import Home from '../screens/home/Home';
import Login from '../screens/auth/login/Login';
import Signup from '../screens/auth/signup/Signup';

const Screens = ({ }) => {

    const Stack = createNativeStackNavigator();
    const { isLoggedIn } = useCommon()

    return (
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}


export default Screens