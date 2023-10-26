import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuthenticationStore } from '../../utility/authentication';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

function CheckoutMessage(
    {
        children,
        readyToPurchase
    }: {
        children?: React.ReactNode
        readyToPurchase: boolean
    }
) {
    const authenticationStore = useAuthenticationStore();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    if (authenticationStore.signedIn() && readyToPurchase) {
        return children
    }

    if (authenticationStore.signedIn() && !readyToPurchase) {
        return <Text className="text-white font-bold text-lg">
            Please specify booking time for the car.
        </Text>
    }

    if (!authenticationStore.signedIn()) {
        return <View className="flex-row">
            <Text className="text-white font-bold text-lg">Please </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-blue-500 font-bold text-lg underline">login</Text>
            </TouchableOpacity>
            <Text className="text-white font-bold text-lg"> or </Text>
            <TouchableOpacity>
                <Text className="text-blue-500 font-bold text-lg underline">sign-up</Text>
            </TouchableOpacity>
            <Text className="text-white font-bold text-lg"> before purchasing a car.</Text>
        </View>
    }
}

export function CheckoutDrawer(
    {
        onPurchase,
        onCancel,
        children,
        readyToPurchase
    }:
        {
            onPurchase: () => void,
            onCancel: () => void,
            children?: React.ReactNode
            readyToPurchase: boolean
        }
) {
    const authenticationStore = useAuthenticationStore();

    return (
        <>
            <View className="flex-col py-4 bg-slate-300 rounded-t-2xl space-y-4">
                <View className="flex-row justify-between px-8">
                    <CheckoutMessage readyToPurchase={readyToPurchase}>
                        {children}
                    </CheckoutMessage>
                </View>
                <View className="w-full h-px  bg-slate-400"></View>
                <View className='flex-row justify-evenly'>
                    <TouchableOpacity className="bg-white border-2 border-primary py-4 px-12 rounded-xl" onPress={onCancel}>
                        <Text className='text-primary font-bold text-lg'>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className={` py-4 px-12 rounded-xl ${(readyToPurchase && authenticationStore.signedIn()) ? "bg-primary" : "bg-gray-400"}`}
                        onPress={onPurchase}
                        disabled={!(readyToPurchase && authenticationStore.signedIn())}
                    >
                        <Text className={`font-bold text-lg ${(readyToPurchase && authenticationStore.signedIn()) ? "text-white" : "text-gray-300"}`}>Purchase</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <SafeAreaView className="bg-slate-300 rounded-b-2xl" />
        </>
    );
}