import * as React from 'react';
import { View, Text } from 'react-native';

export function LocationCard({ location }: { location: String }) {

    return (
        <View>
                <View className="flex-row items-center px-5">
                    <Text className='text-xl text-gray-600 font-bold px-5'>
                        Location
                    </Text>
                    <Text className="text-xl text-gray-600">
                        {location}
                    </Text>
                </View>
        </View>
    );
}