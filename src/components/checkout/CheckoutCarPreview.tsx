import * as React from 'react';
import { Text, View } from 'react-native';
import { Car } from '../../api/apiSchemas';
import { CarImage } from '../CarImage';

export function CheckoutCarPreview(
    { car }: {
        car: Car
    }
) {
    return (
        <View className="p-4 bg-white rounded-xl shadow-xl  space-y-2">
            <CarImage car={car} />
            <View>
                <Text className="text-2xl font-bold">
                    {car.car_model?.name}
                </Text>
                <Text className="text-gray-500">
                    {car.year}
                </Text>
            </View>
        </View>
    );
}