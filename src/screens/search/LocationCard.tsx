import * as React from 'react';
import { View, Text } from 'react-native';

export function LocationCard({ location }: { location: String }) {

    return (
        <View className="p-4 bg-white rounded-xl shadow-xl">
                <View className="flex-row items-center">
                    <Text className="text-xl font-bold text-gray-600">
                        {location}
                    </Text>
                </View>
        </View>
    );
}