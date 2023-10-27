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
import { OrderConfirmation } from '../screens/bookings/OrderConfirmation';
import { LoginScreen } from '../screens/settings/Login';
import { SignUpScreen } from '../screens/settings/SignUp';
import { ReviewScreen } from '../screens/bookings/Review';

const RootStack = createNativeStackNavigator();

export function RootStackNavigator() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen options={{ headerShown: false }} name="Tab" component={TabNavigator} />
            <RootStack.Screen name="Car Details" component={CarDetailsScreen} />
            <RootStack.Screen name="Filter" component={FilterScreen} />
            <RootStack.Screen name="Edit Profile" component={EditProfileScreen} />
            <RootStack.Screen name="Order Booking" component={OrderBookingScreen} initialParams={{carId: 1}}/>
            <RootStack.Screen name="Manage Car Booking" component={ManageBookingScreen} />
            <RootStack.Screen name="Inspection" component={InspectionScreen} />
            <RootStack.Screen name="Review" component={ReviewScreen} />
            <RootStack.Screen name="Complaint" component={ComplaintScreen} />
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Sign Up" component={SignUpScreen} />
            <RootStack.Screen name="OrderConfirmation" component={OrderConfirmation} />
        </RootStack.Navigator>
    );
}