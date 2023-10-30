import React from "react";
import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SearchHeader } from "../../components/SearchHeader";
import { CarList } from "../../components/CarList";


export function SearchScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <>
        <SearchHeader />
        <CarList />

        </>

    );
}