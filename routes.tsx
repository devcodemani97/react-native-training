import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'// yarn add @react-navigation/drawer
import Home from './Home';
import Details from './Details';
import Login from './App';

const Stack = createStackNavigator(); //stacknavigation

// drawer navigation
const Drawer = createDrawerNavigator();

const DrawerRoute = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Details" component={Details} />
        </Drawer.Navigator>
    )
}

const MainRoutes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Dashboard" component={DrawerRoute} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainRoutes;
