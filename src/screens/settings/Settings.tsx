import React from "react";
import { View, Button, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuthenticationStore } from "../../utility/authentication";
import { useCurrentUserCurrentUserGet } from "../../api/apiComponents";

export function SettingsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const authenticationStore = useAuthenticationStore();
    const {data, error, isLoading} = useCurrentUserCurrentUserGet({});

    if(authenticationStore.signedIn() && isLoading) {
        return (
            <View className="flex-1 items-center justify-center ">
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if(authenticationStore.signedIn() && error) {
        return (
            <View className="flex-1 items-center justify-center ">
                <Text>
                    {JSON.stringify(error)}
                </Text>
            </View>
        )
    }

    return (
        <ScrollView className="flex-col p-4">
            {
                authenticationStore.signedIn() && (<View className="flex-1 items-center">
                    <View className="rounded-full bg-gray-500 aspect-square w-1/2 items-center justify-center">
                        <FontAwesome name="user" size={100} color="white" />
                        <TouchableOpacity className="absolute items-center justify-center bottom-[6%] right-[6%] w-1/5 aspect-square rounded-full bg-primary">
                            <FontAwesome name="pencil" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="pt-2 text-2xl font-bold capitalize">{data?.full_name}</Text>
                    <View className="flex-row pt-2 space-x-2 ">
                        <Text className="text-gray-600">@{data?.username}</Text>
                        <View className="w-[1.5px] bg-gray-400" />
                        <Text className="text-gray-600 ">{data?.email}</Text>
                    </View>
                </View>)
            }


            <View className="flex-col pt-8 px-8 space-y-4">
                {
                    authenticationStore.signedIn() ? (<View className="space-y-4">
                        <TouchableOpacity className="items-center py-2 bg-primary rounded-xl">
                            <Text className="text-white font-bold text-base">Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center py-2 bg-primary rounded-xl" onPress={() => authenticationStore.signOut()}>
                            <Text className="text-white font-bold text-base">Sign Out</Text>
                        </TouchableOpacity>
                    </View>) : (<View className="space-y-4">
                    <Text className="text-red-500 font-bold pb-4">You are not signed in, please login or create a new account.</Text>
                        <TouchableOpacity className="items-center py-2 bg-primary rounded-xl" onPress={() => navigation.navigate("Login")}>
                            <Text className="text-white font-bold text-base">Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="items-center py-2 bg-primary rounded-xl">
                            <Text className="text-white font-bold text-base">Sign Up</Text>
                        </TouchableOpacity>
                    </View>)
                }

                <TouchableOpacity className="items-center py-2 bg-white border-2 border-primary rounded-xl">
                    <Text className="text-primary font-bold text-base">Contact Us</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}