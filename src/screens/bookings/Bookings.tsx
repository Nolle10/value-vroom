import React from "react";
import { View, Button, Text, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarCard, CarCardState } from "../../components/CarCard";
import { useCurrentUserCurrentUserGet, useGetAllCars, useGetBookedCars, useGetBookingsBookingsGet } from "../../api/apiComponents";

export function BookingsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    let {data:data_1, error:error_1, isLoading:isLoading_1} = useGetBookingsBookingsGet({});
    let {data:currentUserData, error:userError, isLoading:isLoading_user} = useCurrentUserCurrentUserGet({});
    const filteredBookings = data_1?.filter(booking => booking.username ===currentUserData?.username)
    const now = new Date(Date.now()).toLocaleDateString();
     const {data, error, isLoading} = useGetBookedCars({});
       if (isLoading){
       return(
             <Button
                title="Please log into your account" onPress={() => navigation.navigate("Login")}
            />
       );
       }
       if (error) {
        return(
            <Text>
            "An error happend"
            </Text>
                );
       }
    return (
       <ScrollView style={{ flex: 1 }}>
            <Text className="text-lg text-black  bg-primary rounded p-2 text-center">
                Currently Booked
            </Text>
            {filteredBookings?.map((booking,index) =>{
            if (booking.car) {
                    const start = new Date(booking.start_date).toLocaleDateString();
                    const end = new Date(booking.end_date).toLocaleDateString();
                
                    if( start <= now && now <= end){
                    return (<CarCard car={booking.car} state={CarCardState.Booked} key={index} />);
                    }
                }
                return null; 
            })}

            
            <Text className="text-lg text-black bg-primary rounded p-2 text-center">
                Future Bookings
            </Text>
            
       {filteredBookings?.map((booking,index) =>{
            if (booking.car) {
                    const start = new Date(booking.start_date).toLocaleDateString();
                    if(start>now){
                    return (<CarCard car={booking.car} state={CarCardState.Booked} key={index} />);
                    }
                }
                return null; 
            })}
            <Text className="text-lg text-black bg-primary rounded p-2 text-center">
                Old Bookings
            </Text>
            {filteredBookings?.map((booking,index) =>{
            if (booking.car) {
                    const end = new Date(booking.end_date).toLocaleDateString();
                    if(end<now){
                    return (<CarCard car={booking.car} state={CarCardState.Booked} key={index} />);
                    }
                }
                return null; 
            })}
        </ScrollView>
    );
}
