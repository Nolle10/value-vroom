import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Car } from '../api/apiSchemas'
import {baseUrl} from '../api/apiUrl'

export function CarCard({ car }: { car: Car }) {
    return (
        <View className="flex-col rounded-2xl shadow-md bg-white my-2 py-2 p-4 space-y-4 max-w-lg">
            <View className="flex-row">
                <View className="flex-1 flex-col space-y-2">
                    <View>
                    <Text className="text-xl font-bold">{car.car_model?.name}</Text>
                    <Text className="text-lg text-gray-400">{car.year}</Text>
                    </View>
                    <View className="flex-row items-center space-x-1">
                        <FontAwesome name="star" size={22} color="orange" />
                        <Text className="text-lg">4.5</Text>
                    </View>
                </View>
                <View className="flex-1">
                        <Image className="aspect-video" style={{resizeMode: "contain"}} source={{ uri: baseUrl + "/images/" + car.car_model?.image_name }} />
                </View>
            </View>
            <View className="grow flex-row justify-around px-5 space-x-4">
                <View className="flex-row items-center space-x-1">
                    <FontAwesome name="map-marker" size={18} color="gray" />
                    <Text className="text-lg text-gray-400">{car.city}</Text>
                </View>
                <View className="w-[1.5px] bg-gray-400" />
                <View className="flex-row items-center space-x-1">
                    <FontAwesome5 name="gas-pump" size={16} color="gray" />
                    <Text className="text-lg  text-gray-400 capitalize">{car.car_model?.fuel_type}</Text>
                </View>
                <View className="w-[1.5px] bg-gray-400" />
                <View className="flex-row items-center space-x-1">
                    <FontAwesome5 name="money-bill-alt" size={16} color="gray" />
                    <View className="flex-row">
                    <Text className="text-lg normal-case  text-gray-400">{car.price}kr</Text>
                    <Text className="text-lg normal-case text-gray-400">/day</Text>
                    </View>
                </View>
            </View>
            <View className="grow flex-row justify-around">
                <TouchableOpacity className="text-lg border-2 border-transparent bg-primary rounded-xl px-4 py-2">
                    <Text className="text-lg text-white">Rent Now</Text>
                </TouchableOpacity>
                <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2">
                    <Text className="text-lg text-primary">Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}