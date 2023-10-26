import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { ManageBookingScreen } from '../screens/bookings/ManageBooking';
import { CarDetailsScreen } from '../screens/search/CarDetails';
import { FilterScreen } from '../screens/search/Filter';
import { EditProfileScreen } from '../screens/settings/EditProfile';
import { OrderBookingScreen } from '../screens/bookings/OrderBooking';
import { InspectionScreen } from '../screens/bookings/Inspection';
import { ComplaintScreen } from '../screens/bookings/Complaint';
import { LoginScreen } from '../screens/settings/Login';

const RootStack = createNativeStackNavigator();

export function RootStackNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen options={{ headerShown: false }} name="Tab" component={TabNavigator} />
            <RootStack.Screen name="Car Details" component={CarDetailsScreen} />
            <RootStack.Screen name="Filter" component={FilterScreen} />
            <RootStack.Screen name="Edit Profile" component={EditProfileScreen} />
            <RootStack.Screen name="Order Booking" component={OrderBookingScreen} />
            <RootStack.Screen name="Manage Car Booking" component={ManageBookingScreen} />
            <RootStack.Screen name="Inspection" component={InspectionScreen} />
            <RootStack.Screen name="Complaint" component={ComplaintScreen} />
            <RootStack.Screen name="Login" component={LoginScreen} />
        </RootStack.Navigator>
    );
}