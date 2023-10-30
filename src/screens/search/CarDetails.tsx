import React from "react";
import { View, Button, Text, ActivityIndicator } from "react-native";
import { useGetAllCars } from '../../api/apiComponents';
import { Car } from "../../api/apiSchemas";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarImage } from "../../components/CarImage";
import { DetailCard } from "./DetailCard";
import { LocationCard } from "./LocationCard";
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
        <ScrollView contentContainerStyle={{ gap: 20 }} className="flex-1 flex-col p-4">
            <View className="flex px-5 py-2">
                <View className="flex flex-row justify-between">
                    <Text className="font-bold text-xl">{car.car_model_name}</Text>
                    <View></View>
                    <Text>{(Math.round(car.rating * 10) / 10).toFixed(1)}</Text>
                </View>
                <Text>{car.year}</Text>
            </View>
            <View>
                <CarImage car={car}/>
            </View>
            <View>
                <View>
                    <Text className="px-4">Details</Text>
                </View>
                <View className="flex-1 flex-row p-4 justify-between">
                    <DetailCard name={"Motor"} amount={car.car_model?.horse_power} units={"HP"}/>
                    <DetailCard name={"Fuel Economy"} amount={car.car_model?.fuel_economy} units={"km/L"}/>
                    <DetailCard name={"Horsepower"} units={car.car_model?.fuel_type} />
                </View>
            </View>
            <View>
                <View className="px-4">
                    <Text>Location</Text>
                </View>
                <View className="p-4">
                    <LocationCard location={car.city + " - " + car.country} />
                </View>
            </View>
            <View>
                <View className="px-4">
                    <Text>Reviews</Text>
                </View>
                <ScrollView horizontal className="p-4 overflow-hidden">
                    {reviews}
                </ScrollView>
            </View>
            </ScrollView>
            <View className="p-4 border-2 border-black">
                <BookCarButton price={car.price} />
            </View>
        </View>
    );
}