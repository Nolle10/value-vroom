import * as React from 'react';
import { View, Text } from 'react-native';

export function DetailCard({ name, amount, units }: { name: String, amount?: number | string | undefined, units: string }) {

    return (
        <View className="p-4 bg-white rounded-xl shadow-xl">
                <Text className="text-gray-500">
                    {name}
                </Text>
                <View className="flex-row items-center">
                    <Text className="text-xl font-bold text-gray-600">
                        {amount}
                    </Text>
                    <Text className="text-xl font-bold text-gray-600">
                        {units}
                    </Text>
                </View>
        </View>
    );
}