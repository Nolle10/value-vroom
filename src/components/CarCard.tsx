import * as React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Booking, Car } from '../api/apiSchemas'
import { baseUrl } from '../api/apiUrl'
import { format } from "date-fns";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarImage } from './CarImage';

export enum CarCardState {
    Active,
    Booked,
    Available,
    Pending,
    Alert
}

function getCardBorder(state: CarCardState) {
    let border = "border-2";
    switch (state) {
        case CarCardState.Active:
            return border + " border-green-500";
        case CarCardState.Booked:
            return border + " border-gray-500";
        case CarCardState.Available:
            return "";
        case CarCardState.Alert:
            return border + " border-red-500";
        case CarCardState.Pending:
            return border + " border-yellow-500";
    }
}

function getActionButtons(state: CarCardState, carId: number) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    switch (state) {
        case CarCardState.Active:
            return (
                <>
                    <TouchableOpacity className="text-lg border-2 border-transparent bg-primary rounded-xl px-4 py-2">
                        <Text className="text-lg text-white">Extend Booking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2">
                        <Text className="text-lg text-primary">More</Text>
                    </TouchableOpacity>
                </>
            )
        case CarCardState.Pending:
        case CarCardState.Booked:
            return (
                <>
                    <TouchableOpacity className="text-lg border-2 border-transparent bg-primary rounded-xl px-4 py-2">
                        <Text className="text-lg text-white">Activate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2">
                        <Text className="text-lg text-primary">Cancel</Text>
                    </TouchableOpacity>
                </>
            )
        case CarCardState.Alert:
            return (<></>)
        case CarCardState.Available:
            return (
                <>
                    <TouchableOpacity className="text-lg border-2 border-transparent bg-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate("Order Booking", { carId: carId })}>
                        <Text className="text-lg text-white">Book Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate("Car Details")}>
                        <Text className="text-lg text-primary">Details</Text>
                    </TouchableOpacity>
                </>
            )

    }
}

export function CarCard({ car, booking, state }: { car: Car, booking?: Booking, state: CarCardState }) {

    return (
        <View className={`flex-col rounded-2xl shadow-md bg-white my-2 py-2 p-4 space-y-4 max-w-l ${getCardBorder(state)}`}>
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
                    {booking && <View className="flex-row space-x-2">
                        <View className="pt-1.5">
                            <FontAwesome5 name="calendar-alt" size={16} color="gray" />
                        </View>
                        <View className="flex-row space-x-1">
                            {/* TODO: Experiment with the date format */}
                            <View className="flex-col text-right">
                                <Text className="text-lg text-gray-400">F:</Text>
                                <Text className="text-lg text-gray-400 text-right">T:</Text>
                            </View>
                            <View className="flex-col">
                                <Text className="text-lg text-gray-400">{format(new Date(booking.start_date), "MMM do")}</Text>
                                <Text className="text-lg text-gray-400">{format(new Date(booking.end_date), "MMM do")}</Text>
                            </View>
                            <View className="flex-col">
                                <Text className="text-lg text-gray-400">{format(new Date(booking.start_date), "HH:mm")}</Text>
                                <Text className="text-lg text-gray-400">{format(new Date(booking.end_date), "HH:mm")}</Text>
                            </View>
                        </View>
                    </View>}
                </View>
                <View className="flex-1">
                    <CarImage car={car} />
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
                {getActionButtons(state, car.id)}
            </View>
        </View>
    );
}