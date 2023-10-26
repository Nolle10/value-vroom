import React from "react";
import { View, SafeAreaView, Text, ActivityIndicator } from "react-native";
import { CarList } from "../components/CarList";
import { SearchHeader } from "../components/SearchHeader";
import { BookingCalender } from "../components/checkout/BookingCalender";

export function HomeScreen() {
    return (
        <>
            <SafeAreaView className="bg-gray-200 dark:bg-gray-700" />
            <View className="flex-1 flex-col">
                <SearchHeader />
                <CarList />
            </View>
        </>
    )
}