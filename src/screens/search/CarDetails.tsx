import React from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import { useGetAllCars } from '../../api/apiComponents';
import { Car } from "../../api/apiSchemas";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarImage } from "../../components/CarImage";
import { DetailCard } from "./DetailCard";
import { LocationCard } from "./LocationCard";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ScrollView } from "react-native-gesture-handler";
import { ReviewCard } from "./ReviewCard";
import { BookCarButton } from "./BookCarButton";

export function CarDetailsScreen(
    {
        route
    }: {
        route: any
    }
) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { data } = useGetAllCars({});

    if (!route.params || !route.params.carId) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>
                    No car selected...
                </Text>
            </View>
        )
    }

    const { carId } = route.params;
    let car: Car | undefined = undefined;

    // Check if the car is available for the selected data
    if (data && data.some((car) => {
        return car.id == carId
    })) {
        car = data.find((car) => {
            return car.id == carId
        });
    }
    
    if(!car) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>
                    Car with id {carId} not found...
                </Text>
            </View>
        )
    }

    let reviews = []
    for (let index = 0; index < 10; index++) {
        reviews.push(<ReviewCard name={"Hans Hansen"} review={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "} stars={5}/>)           
    }

    return (
        <View className="flex-1">
        <ScrollView className="flex-1 flex-col">
            <View className="flex px-5 bg-gray-200">
                <View className="flex flex-row justify-between">
                    <Text className="font-bold text-xl">{car.car_model_name}</Text>
                </View>
                <View className="flex-row">
                    <FontAwesome name="star" size={22} color="orange" />
                    <Text>{Math.round(car.rating)}</Text>
                </View>
            </View>
            <View className="bg-gray-200">
                <View className="flex-row justify-between items-center px-2">
                    <FontAwesome name="caret-left" size={22} color="orange"/>
                    <View className="flex-1">
                        <CarImage car={car} />
                    </View>
                    <FontAwesome name="caret-right" size={22} color="orange"/>
                </View>
            </View>
            <View className="flex-row bg-gray-200 justify-center">
                    <Text className="p-1 mx-1 bg-orange-400 rounded-full" />
                    <Text className="p-1 mx-1 bg-gray-400 rounded-full" />
                    <Text className="p-1 mx-1 bg-gray-400 rounded-full" />
            </View>
            <View className="bg-gray-200 rounded-b-[30px] items-center shadow-xl">
                <View className="p-4">
                    <LocationCard location={car.city + " - " + car.country} />
                </View>
            </View>

            <View>
                <View>
                    <Text className="px-4 py-5 text-xl font-bold">Details</Text>
                </View>
                <View className="flex-1 flex-row p-4 justify-evenly">
                    <DetailCard name={"Motor"} amount={car.car_model?.horse_power} units={"HP"}/>
                    <DetailCard name={"Fuel Economy"} amount={car.car_model?.fuel_economy} units={"km/L"}/>
                    <DetailCard name={"Horsepower"} units={car.car_model?.fuel_type} />
                </View>
            </View>
            <View>
                <View className="px-4">
                    <Text className="text-xl font-bold">Reviews</Text>
                </View>
                <ScrollView horizontal className="p-4 overflow-hidden">
                    {reviews}
                </ScrollView>
            </View>
            </ScrollView>
            <View className="p-10">
                <BookCarButton price={car.price} />
            </View>
        </View>
    );
}