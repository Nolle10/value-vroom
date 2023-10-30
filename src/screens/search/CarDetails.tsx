import React from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { useGetAllCars, useGetCarReviews } from '../../api/apiComponents';
import { Car } from "../../api/apiSchemas";
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
    const { data, isLoading } = useGetAllCars({}, {refetchInterval: 5000});
    const carReviewsHook = useGetCarReviews({pathParams: {carId: route.params.carId}}, {refetchInterval: 5000});

    if (!route.params || !route.params.carId) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>
                    No car selected...
                </Text>
            </View>
        )
    }

    if (carReviewsHook.isLoading || isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
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

    let reviews: React.ReactNode = []
    if(carReviewsHook.data) {
        reviews = carReviewsHook.data.map((review) => {
            return <ReviewCard name={review.user?.full_name || "John Doe"} review={review.comment} stars={review.rating}/>
        })
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