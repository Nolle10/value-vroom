import React from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function BookCarButton({ price }: { price: number }) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();


    return (
        <View>
            <TouchableOpacity className="justify-center bg-primary py-2 px-7 rounded-xl shadow-xl" onPress={() => navigation.navigate('Order Booking')}>
                <View className="flex-row justify-between">
                    <Text className="text-white text-bold text-xl">Rent Now</Text>
                    <View className="flex-row">
                        <Text className="text-white text-bold text-xl">{price}kr</Text>
                        <Text className="text-gray-400 text-bold text-xl">./day</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>

    );
}