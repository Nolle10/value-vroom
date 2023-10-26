import React from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarCard,CarCardState } from "../../components/CarCard";
import { useGetAllCars, useGetBookedCars } from "../../api/apiComponents";
import { CarImage } from "../../components/CarImage";
import { CheckoutCarPreview } from "../../components/checkout/CheckoutCarPreview";

export function ManageBookingScreen(  {
        route
    }: {
        route: any
    }) {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const {data, error, isLoading} = useGetBookedCars({});
    
    const filterData = data?.filter(car => car.id === route.params?.id|| [])
    return (
        <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
  {filterData?.map((car,index) =>

            <CheckoutCarPreview car={car??"no"}/>
            )}
            <Text>Manage Car Booking</Text>
            <View style={{ flex: 2, alignItems: 'center'  }}>
            <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate('Inspection')}>
                        <Text className="text-lg text-white">Inspection</Text>
            </TouchableOpacity>
            <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate('Complaint')}>

                        <Text className="text-lg text-white">Complaint</Text>
            </TouchableOpacity>
            <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate('Car Details')}>
                        <Text className="text-lg text-white">Rebook Car</Text>
            </TouchableOpacity>
            <TouchableOpacity className="text-lg border-2 border-primary rounded-xl px-4 py-2" onPress={() => navigation.navigate('Review')}>
                        <Text className="text-lg text-white">Review Car</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}
