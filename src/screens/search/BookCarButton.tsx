import React from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function BookCarButton({ price }: { price: number }) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();


    return (
        <View className="flex-row justify-between">
            <View>
                <Text className="text-gray-500">Price</Text>
                <View className="flex-row">
                  <Text className="text-bold">{price}</Text>
                  <Text className="text-gray-500">/day</Text>
                </View>
            </View>
            <TouchableOpacity className="justify-center bg-primary py-2 px-7 rounded-xl shadow-xl" onPress={() => navigation.navigate('Order Booking')}>
                <Text className="text-white text-bold text-xl">Book</Text>
            </TouchableOpacity>
        </View>
    );
}