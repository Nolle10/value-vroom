import React from "react";
import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function EditProfileScreen() {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>EditProfile</Text>
        </View>
    );
}