import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCurrentUserCurrentUserGet, useGetAllCars, useGetBookedCars, useGetCarBookings } from "../../api/apiComponents";
import { CheckoutCarPreview } from "../../components/checkout/CheckoutCarPreview";


export function ManageBookingScreen({
  route
}: {
  route: any
}) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
    let {data:bookedCarsData, error:bookedCarError, isLoading:bookedCarIsLoading} = useGetBookedCars({});
    let {data:currentUserData, error:userError, isLoading:isLoading_user} = useCurrentUserCurrentUserGet({});
    const filterData = bookedCarsData?.filter(car => car.id === route.params?.carId)|| []
    let {data: bookingsData, error: bookingsError, isLoading: bookingIsLoading} = useGetCarBookings({pathParams: {
    carId: route.params?.carId}});
    const filteredBookings = bookingsData?.filter(booking => booking.username ===currentUserData?.username)
    if (bookedCarIsLoading || isLoading_user ||bookingIsLoading){
        return (<Text>LOADING...</Text>)
    }
    if (bookedCarError || userError ||bookingsError){
        return (<Text>SOMETHING WENT WRONG, ARE YOU LOGGED IN?</Text>)
    }

    return (
        <View className="flex flex-col items-center bg-gray-100 h-full w-full">
          {filterData?.map((car, index) =>
            <CheckoutCarPreview car={car ?? "no"} key={index} />
          )}
        
          {filteredBookings?.map((booking, index) => {
            const start = new Date(booking.start_date).toLocaleDateString();
            const end = new Date(booking.end_date).toLocaleDateString();
            return (
              <Text className="text-lg bg-primary text-white rounded-lg p-2 mb-1" key={index}>
                {`Booked from ${start} to ${end}`}
              </Text>
            );
          })}
    
          <View className="flex flex-row items-center">
            <TouchableOpacity className="text-lg bg-primary text-white rounded-lg p-3 m-2" onPress={() => navigation.navigate('Order Booking')}>
              <Text className="text-lg">Rebook Car</Text>
            </TouchableOpacity>
            <TouchableOpacity className="text-lg bg-primary text-white rounded-lg p-3 m-2" onPress={() => navigation.navigate('Review')}>
              <Text className="text-lg">Review Car</Text>
            </TouchableOpacity>
          </View>
    
          <View className="flex flex-row items-center">
            <TouchableOpacity className="text-lg bg-primary text-white rounded-lg p-3 m-2" onPress={() => navigation.navigate('Inspection')}>
              <Text className="text-lg">Inspection</Text>
            </TouchableOpacity>
            <TouchableOpacity className="text-lg bg-primary text-white rounded-lg p-3 m-2" onPress={() => navigation.navigate('Complaint')}>
              <Text className="text-lg">Complaint</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }