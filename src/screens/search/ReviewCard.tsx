import * as React from 'react';
import { View, Text } from 'react-native';

export function ReviewCard({ name, review, stars }: { name: String, review: String, stars: number }) {

    return (
        <View className="p-4 bg-white rounded-xl shadow-xl">
                <View className='justify-between flex-row'>    
                    <Text className="text-gray-500">
                        {name}
                    </Text>
                    <Text className="text-gray-500">
                        {stars}
                    </Text>
                </View>
                <View>
                    <Text className="text-xl font-bold text-gray-600">
                        {review}
                    </Text>
                    
                </View>
        </View>
    );
}