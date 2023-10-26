import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home';
import { SettingsScreen } from '../screens/settings/Settings';
import { BookingsScreen } from '../screens/bookings/Bookings';
import { SearchScreen } from '../screens/search/Search';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import tailwindconf from "../../tailwind.config";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

export function TabNavigator() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                switch (route.name) {
                    case 'Home':
                        return <FontAwesome name="home" size={size} color={color} />;
                    case 'Bookings':
                        return <FontAwesome name="calendar" size={size} color={color} />;
                    case 'Search':
                        return <FontAwesome name="search" size={size} color={color} />;
                    case 'Settings':
                        return <FontAwesome name="cog" size={size} color={color} />;
                }
            },
            tabBarActiveTintColor: (tailwindconf as any).theme.extend.colors.primary,
            tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Tab.Screen name="Bookings" component={BookingsScreen} />
            <Tab.Screen name="Search" component={SearchScreen} listeners={{
                tabPress: e => {
                    // Prevent default action
                    e.preventDefault();

                    // Navigate to the home screen
                    navigation.navigate('Home');

                    // Focus the search bar
                    setTimeout(() => {
                    (window as any).searchref.current.focus();
                    }, 0);
                },
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}