import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import { Car } from '../../api/apiSchemas';
import { differenceInHours, differenceInMinutes, format, parse } from 'date-fns';
import { useState } from 'react';
import { useCurrentUserCurrentUserGet, fetchCreateBookingBookingsPost } from '../../api/apiComponents';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { baseUrl } from '../../api/apiUrl';

export function InvoiceModal(
    {
        isVisible,
        setModalVisible,
        bookingStart,
        bookingEnd,
        car
    }: {
        isVisible: boolean
        setModalVisible: (isVisible: boolean) => void,
        bookingStart: Date | undefined,
        bookingEnd: Date | undefined,
        car: Car
    }
) {
    const [bookingTime, setBookingTime] = useState<number>(0);
    const [carRentPrice, setCarRentPrice] = useState<number>(0);
    const { data, error, isLoading } = useCurrentUserCurrentUserGet({});
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const payMutation = useMutation((_: string) => {

        return fetch(`${baseUrl}/bookings`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                car_id: String(car.id),
                end_date: bookingEnd?.toISOString() ?? "",
                ...(bookingStart && (differenceInMinutes(new Date(), bookingStart) > 10) && { start_date: bookingStart?.toISOString() ??  ""})
            }).toString(),
        });
    });

    React.useEffect(() => {
        if (!bookingStart || !bookingEnd) {
            return;
        }
        setBookingTime(Math.abs(differenceInHours(bookingEnd, bookingStart)));
    }, [bookingStart, bookingEnd]);

    React.useEffect(() => {
        if (!car) {
            return;
        }

        setCarRentPrice((car.price / 100) * bookingTime);
    }, [car, bookingTime]);

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={() => setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection="down"
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            hasBackdrop={true}
            style={{ justifyContent: 'flex-end', margin: 0 }}
        >
            {isLoading && (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}

            {error && (
                <View className="flex-1 justify-center items-center">
                    <Text>
                        Failed to load user...
                    </Text>
                </View>
            )}

            {data && (
                <View className="p-4 pb-1 bg-white rounded-t-2xl">
                    <Text className="text-lg font-bold border-b mb-2">Order Invoice</Text>
                    <View className='px-1'>
                        <Text className="font-mono">Invoice Date: {format(new Date(), 'yyyy-MM-dd')}</Text>
                        <Text className="font-mono">Invoice Number: TBD</Text>
                        <Text className="font-mono"> </Text>
                        <Text className="font-mono">Billing:</Text>
                        <Text className="font-mono"> - Name: {data.full_name}</Text>
                        <Text className="font-mono"> - E-Mail: {data.email}</Text>
                        <Text className="font-mono"> - Address: TBD </Text>
                        <Text className="font-mono"> - Phone: TBD</Text>
                        <Text className="font-mono"> </Text>
                        <Text className="font-mono pb-1">Description of Services:</Text>
                        <View className="flex-row justify-between mb-4">
                            <View className="flex-[2] flex-col">
                                <View className="border-y">
                                    <Text className="font-mono">Item</Text>
                                </View>
                                <Text className="font-mono pr-2">Tesla Model 3</Text>
                                <Text className="font-mono pr-2">Service Fee</Text>
                                <Text className="font-mono pr-2">Premium Insurance</Text>
                                <Text className="font-mono pr-2 border-y">Total</Text>
                            </View>
                            <View className="flex-1 flex-col">
                                <View className="border-y">
                                    <Text className="font-mono">Quantity</Text>
                                </View>
                                <Text className="font-mono">{bookingTime} hours</Text>
                                <Text className="font-mono">1</Text>
                                <Text className="font-mono">1</Text>
                                <Text className="font-mono pr-2 border-y"> </Text>
                            </View>
                            <View className="flex-1 flex-col">
                                <View className="border-y">
                                    <Text className="font-mono">Rate</Text>
                                </View>
                                <Text className="font-mono">USD {car.price / 100}/hour</Text>
                                <Text className="font-mono"> </Text>
                                <Text className="font-mono"> </Text>
                                <Text className="font-mono pr-2 border-y"> </Text>
                            </View>
                            <View className="flex-1 flex-col">
                                <View className="border-y">
                                    <Text className="font-mono">Price</Text>
                                </View>
                                <Text className="font-mono">USD {carRentPrice}</Text>
                                <Text className="font-mono">USD 10</Text>
                                <Text className="font-mono">USD 100</Text>
                                <Text className="font-mono pr-2 border-y">USD {carRentPrice + 110}</Text>
                            </View>
                        </View>
                        <View className="flex-row pb-1">
                            <Text className="font-mono">Terms and Conditions: </Text>
                            <Text className="font-mono underline text-blue-700">Click here</Text>
                        </View>
                        <Text className="font-mono py-2">Thank you for choosing Value-Vroom for renting your car.</Text>
                    </View>
                    <View className="flex-row border-t py-2 items-center justify-end p-2 space-x-4">
                        {(payMutation.isError) && (
                            <Text className="text-red-500">
                                Unable to pay invoice. Please try again later.
                            </Text>
                        )}
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text className="bg-gray-400 rounded p-2">Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => payMutation.mutate("", {
                            onSuccess: () => {
                                setModalVisible(false);
                                navigation.navigate('Home');
                            }
                        })}>
                            {payMutation.isLoading ? (
                                <ActivityIndicator size="small" color="#0000ff" />
                            ) : <Text className="bg-green-500 rounded p-2">Pay Invoice</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Modal>
    );
}