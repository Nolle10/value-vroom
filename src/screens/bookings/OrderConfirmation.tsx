import React from "react";
import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native-gesture-handler";

export function OrderConfirmation() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text className="font-bold text-4xl tw-gray-100 dark:text-white mb-10">Thank you for using</Text>

            <View className="flex-row justify-center space-x-2 mb-10">
                <View className="flex-col justify-around py-1">
                    <View className="ml-2 w-12 h-[2px] bg-gray-400"></View>
                    <View className="w-12 h-[2px]  bg-gray-400"></View>
                    <View className="ml-2 w-12 h-[2px]  bg-gray-400"></View>
                </View>
                <Text className="font-bold text-5xl text-primary">ValueVroom</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <text className="text-4xl tw-white dark:text-white mb-10">Back to home</text>
            </TouchableOpacity>
        </View>
    );
}