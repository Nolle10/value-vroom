import * as React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useGetAvailableCars, useGetBookingsBookingsGet } from '../api/apiComponents';
import { CarCard, CarCardState } from './CarCard';
import { getPrimaryColor } from '../utility';
import { Booking } from '../api/apiSchemas';
import { useAuthenticationStore } from '../utility/authentication';

export function CarList() {
    const authenticationStore = useAuthenticationStore();
    const availableCars = useGetAvailableCars({}, { refetchInterval: 5000 });
    const bookings = useGetBookingsBookingsGet({}, { refetchInterval: 5000 });

    if (availableCars.error) {
        return (
            <View className="flex-1 items-center justify-center ">
                <Text>
                    Failed to load homescreen...
                </Text>
            </View>
        )
    }

    if (availableCars.isLoading) {
        return <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={getPrimaryColor()} />
        </View>
    }

    let groupedBookings: Map<String, Booking[]> = new Map<String, Booking[]>(); 
    if(authenticationStore.signedIn()) {
        groupedBookings.set("Alert", []);
        groupedBookings.set("Pending", []);
        groupedBookings.set("Active", []);
        groupedBookings.set("Booked", []);
    
        if (bookings.data) {
            for(let [name, _] of groupedBookings.entries()) {
                let bookings_filter = bookings.data.filter((booking: Booking) => {
                    console.error(booking.status?.name);
                    return booking.status_name === name
                });
                groupedBookings.set(name, bookings_filter);
            }
    
            for(let [name, bookings] of groupedBookings.entries()) {
                if(bookings.length === 0) {
                    groupedBookings.delete(name);
                }
            }
        }
    }


    return (
        <ScrollView className="flex-col px-4 z-1">
            {groupedBookings.has("Alert") && (
                <>
                    <Text className="py-2 text-2xl font-bold">Alert</Text>
                    {groupedBookings.get("Alert")?.map((booking) => (
                        <CarCard state={CarCardState.Alert} key={booking.car?.id} car={booking.car!} booking={booking} />
                    )
                    )}
                </>
            )}
            {groupedBookings.get("Pending") && (
                <>
                    <Text className="py-2 text-2xl font-bold">Pending</Text>
                    {groupedBookings.get("Pending")?.map((booking) => (
                        <CarCard state={CarCardState.Pending} key={booking.car?.id} car={booking.car!} booking={booking}  />
                    )
                    )}
                </>
            )}
            {groupedBookings.has("Active") && (
                <>
                    <Text className="py-2 text-2xl font-bold">Active</Text>
                    {groupedBookings.get("Active")?.map((booking) => (
                        <CarCard state={CarCardState.Active} key={booking.car?.id} car={booking.car!} booking={booking}  />
                    )
                    )}
                </>
            )}
            {groupedBookings.has("Booked") && (
                <>
                    <Text className="py-2 text-2xl font-bold">Booked</Text>
                    {groupedBookings.get("Booked")?.map((booking) => (
                        <CarCard state={CarCardState.Booked} key={booking.car?.id} car={booking.car!} booking={booking}  />
                    ))}
                </>
            )}
            <Text className="py-2 text-2xl font-bold">Recommended</Text>
            {availableCars.data?.map((car) => (
                <CarCard state={CarCardState.Available} key={car.id} car={car} />
            )
            )}
        </ScrollView>
    );
}