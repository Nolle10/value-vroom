import * as React from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useGetCarsCarsGet } from '../api/apiComponents';
import { CarCard } from './CarCard';
import { getPrimaryColor } from '../utility';

export function CarList() {
    const { data, error, isLoading } = useGetCarsCarsGet({}, { refetchInterval: 5000 });

    if (error) {
        return (
            <View className="flex-1 items-center justify-center ">
                <Text>
                    Failed to load homescreen...
                </Text>
            </View>
        )
    }

    if (isLoading) {
        return <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={getPrimaryColor()} />
        </View>
    }

    return (
        <ScrollView className="flex-col px-4 z-1">
            <Text className="py-2 text-2xl font-bold">Recommended</Text>
            {data?.map((car) => (
                <CarCard key={car.id} car={car} />
            )
            )}
        </ScrollView>
    );
}