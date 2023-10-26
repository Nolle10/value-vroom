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
  // ... (your existing logic remains the same)
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
    let {data:data_1, error:error_1, isLoading:isLoading_1} = useGetBookedCars({});
    let {data:currentUserData, error:userError, isLoading:isLoading_user} = useCurrentUserCurrentUserGet({});
    const filterData = data_1?.filter(car => car.id === route.params?.carId)|| []
    console.log(filterData)
    let {data, error, isLoading} = useGetCarBookings({pathParams: {
    carId: route.params?.carId}});
    const filteredBookings = data?.filter(booking => booking.username ===currentUserData?.username)
  

    return (
        <div className="flex flex-col items-center bg-gray-100 h-full w-full">
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
    
          <div className="flex flex-row items-center">
            <TouchableOpacity className="text-lg bg-primary text-white rounded-lg p-3 m-2" onPress={() => navigation.navigate('Order Booking')}>
              <Text className="text-lg">Rebook Car</Text>
            </TouchableOpacity>
            <TouchableOpacity className="text-lg bg-primary text-white rounded-lg p-3 m-2" onPress={() => navigation.navigate('Review')}>
              <Text className="text-lg">Review Car</Text>
            </TouchableOpacity>
          </div>
    
          <div className="flex flex-row items-center">
            <TouchableOpacity className="text-lg bg-primary text-white rounded-lg p-3 m-2" onPress={() => navigation.navigate('Inspection')}>
              <Text className="text-lg">Inspection</Text>
            </TouchableOpacity>
            <TouchableOpacity className="text-lg bg-primary text-white rounded-lg p-3 m-2" onPress={() => navigation.navigate('Complaint')}>
              <Text className="text-lg">Complaint</Text>
            </TouchableOpacity>
          </div>
        </div>
      );
    }