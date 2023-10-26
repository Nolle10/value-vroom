import React from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarCard,CarCardState } from "../../components/CarCard";
import { useCurrentUserCurrentUserGet, useGetAllCars, useGetBookedCars, useGetCarBookings } from "../../api/apiComponents";
import { CarImage } from "../../components/CarImage";
import { CheckoutCarPreview } from "../../components/checkout/CheckoutCarPreview";

export function ManageBookingScreen(  {
        route
    }: {
        route: any
    }) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    let {data:data_1, error:error_1, isLoading:isLoading_1} = useGetBookedCars({});
    let {data:currentUserData, error:userError, isLoading:isLoading_user} = useCurrentUserCurrentUserGet({});
    const filterData = data_1?.filter(car => car.id === route.params?.carId)|| []
    console.log(filterData)
    let {data, error, isLoading} = useGetCarBookings({pathParams: {
    carId: route.params?.carId}});
    const filteredBookings = data?.filter(booking => booking.username ===currentUserData?.username)
    return (
        <View style={{ flex: 1, alignItems: 'center' }} className={'flex-col rounded-2xl shadow-md bg-white my-2 py-2 p-4 space-y-4 max-w-li'}>
   {filterData?.map((car,index) =>

            <CheckoutCarPreview car={car??"no"}/>
            )}
  {filteredBookings?.map((booking,index) => {
    const start = new Date(booking.start_date).toLocaleDateString();
    const end = new Date(booking.end_date).toLocaleDateString();
    return (
             <Text className="text-lg text-white" key={index}>
        {`Booked from ${start} to ${end}`}
            </Text>

          );    }            )}
            
            <View style={{ flexDirection: 'row', flex: 0.2, alignItems: 'center'  }}>
            <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate('Order Booking')}>
                        <Text className="text-lg text-white">Rebook Car</Text>
            </TouchableOpacity>
            <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate('Review')}>
                        <Text className="text-lg text-white">Review Car</Text>
            </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', flex: 0.2, alignItems: 'center'  }}>
            <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate('Inspection')}>
                        <Text className="text-lg text-white">Inspection</Text>
            </TouchableOpacity>
            <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate('Complaint')}>

                        <Text className="text-lg text-orange">Complaint</Text>
            </TouchableOpacity>
            </View>
           
        </View>
    );
}
