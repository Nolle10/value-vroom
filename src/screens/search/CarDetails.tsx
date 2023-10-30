import React from "react";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { useGetAllCars, useGetCarReviews } from '../../api/apiComponents';
import { Car } from "../../api/apiSchemas";
import { CarImage } from "../../components/CarImage";
import { DetailCard } from "./DetailCard";
import { LocationCard } from "./LocationCard";
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