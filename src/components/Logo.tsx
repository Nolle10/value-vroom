import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export function Logo() {
    return (
        <View className="flex-row justify-center space-x-2">
            <View className="flex-col justify-around py-1">
                <View className="ml-2 w-12 h-[2px] bg-gray-400"></View>
                <View className="w-12 h-[2px]  bg-gray-400"></View>
                <View className="ml-2 w-12 h-[2px]  bg-gray-400"></View>
            </View>
            <Text className="font-bold text-4xl text-primary">ValueVroom</Text>
        </View>
    );
}