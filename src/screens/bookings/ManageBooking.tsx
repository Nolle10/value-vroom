import React from "react";
import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function ManageBookingScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Manage Car Booking</Text>
            <Button
                title="Go to Inspection"
                onPress={() => navigation.navigate('Inspection')}
            />
            <Button
                title="Go to Complaint"
                onPress={() => navigation.navigate('Complaint')}
            />
            <Button
                title="Rebook car"
                onPress={() => navigation.navigate('Car Details')}
            />
            <Button
                title="Go back to Bookings"
                onPress={() => navigation.navigate('Bookings')}
            />
        </View>
    );
}