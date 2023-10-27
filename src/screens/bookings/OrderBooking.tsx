import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { CheckoutDrawer } from "../../components/checkout/CheckoutDrawer";
import { LocationPicker, LocationType } from "../../components/checkout/LocationPicker";
import { CheckoutCarPreview } from "../../components/checkout/CheckoutCarPreview";
import { DatePicker } from "../../components/checkout/DatePicker";
import { timeslotToDate } from "../../components/checkout/BookingTimePicker";
import { differenceInHours, intervalToDuration } from "date-fns";
import { useGetAllCars } from '../../api/apiComponents';
import { Car } from "../../api/apiSchemas";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { InvoiceModal } from "../../components/checkout/InvoiceModal";

export function OrderBookingScreen(
    {
        route
    }: {
        route: any
    }
) {
    const { data, error, isLoading } = useGetAllCars({});
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState<boolean>(false);

    const [bookedDuration, setBookedDuration] = useState<Duration | undefined>(undefined);

    useEffect(() => {
        if (startDate && endDate) {
            setBookedDuration(intervalToDuration({
                start: startDate,
                end: endDate
            }));
        } else {
            setBookedDuration(undefined);
        }
    }, [startDate, endDate]);

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>
                    Failed to load car...
                </Text>
            </View>
        )
    }

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

    const getPrice = (start?: Date, end?: Date, car?: Car) => {
        if (!start || !end || !car) {
            return 0;
        }
        return Math.abs(differenceInHours(start, end)) * (car.price / 100);
    }

    return (
        <View className="flex-1 justify-between">
            <ScrollView contentContainerStyle={{ gap: 20 }} className="flex-1 flex-col p-4">
                <CheckoutCarPreview car={car} />
                <LocationPicker disabled={true} defaultLocation="ODENSE - DENMARK" locationType={LocationType.Pickup} onSelect={() => { }} />
                <LocationPicker disabled={false} defaultLocation="ODENSE - DENMARK" locationType={LocationType.Dropoff} onSelect={() => { }} />
                <DatePicker carId={car.id} onDate={(firstDate, firstTimeslot, secondDate, secondTimeslot) => {
                    setStartDate(firstTimeslot ? timeslotToDate(firstTimeslot, firstDate) : undefined);
                    setEndDate(secondTimeslot ? timeslotToDate(secondTimeslot, secondDate) : undefined);
                }} />
            </ScrollView>
            <CheckoutDrawer readyToPurchase={bookedDuration != undefined} onPurchase={() => setIsInvoiceModalVisible(true)} onCancel={() => { navigation.goBack()}}>
                <Text className="text-white font-bold text-xl">Total</Text>
                <View className="flex-row space-x-2">
                    {(bookedDuration && bookedDuration.days && bookedDuration.days > 0) ? <Text className="text-white font-bold text-base">{bookedDuration.days} days</Text> : <></>}
                    {(bookedDuration && bookedDuration.hours && bookedDuration.hours > 0) ? <Text className="text-white font-bold text-base">{bookedDuration.hours} hours</Text> : <></>}
                    {(bookedDuration && bookedDuration.minutes && bookedDuration.minutes > 0) ? <Text className="text-white font-bold text-base">{bookedDuration.minutes} minutes</Text> : <></>}
                    <Text className="text-white font-bold text-base"> / </Text>
                    <Text className="text-white font-bold text-xl">$ {getPrice(startDate, endDate, car)}</Text>
                </View>
            </CheckoutDrawer>
            <InvoiceModal bookingStart={startDate} bookingEnd={endDate} car={car} isVisible={isInvoiceModalVisible} setModalVisible={setIsInvoiceModalVisible} />
        </View>
    )
}
