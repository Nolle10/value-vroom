import * as React from 'react';
import { View, Text } from 'react-native';

export function DetailCard({ name, amount, units }: { name: String, amount?: number | string | undefined, units: string }) {

    return (
        <View className="p-4 bg-white rounded-xl shadow-xl border-2 border-gray-200">
                <Text className="text-black font-bold">
                    {name}
                </Text>
                <View className="flex-row capitalize items-center">
                    <Text className="text-gray-600">
                        {amount}
                    </Text>
                    <Text className="capitalize text-gray-600">
                        {units}
                    </Text>
                </View>
        </View>
    );
}