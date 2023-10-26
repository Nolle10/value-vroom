import React from "react";
import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarCard, CarCardState } from "../../components/CarCard";
import { useGetAllCars, useGetBookedCars } from "../../api/apiComponents";
import { ScrollView } from "react-native-gesture-handler";
export function BookingsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

     const {data, error, isLoading} = useGetBookedCars({});
       if (isLoading){
       return(
             <Button
                title="Ohh shit go back"
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

            {data?.map((_car,index) =>

            <CarCard car={data[index]??"no"} state={CarCardState.Booked}/>
            )}
            
            <Button
                title="Go to Manage Car Booking"
                onPress={() => navigation.navigate('Manage Car Booking')}
            />
        </ScrollView>
    );
}
