import React from "react";
import { View, Button, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextInput } from "react-native-gesture-handler";

export function EditProfileScreen() {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View className="rounded-full bg-gray-500 aspect-square w-1/2 items-center justify-center">
                <Image source={{uri:'https://www.w3schools.com/w3images/avatar2.png'}} style={{width: 300, height: 300}}  className="rounded-full"/>
                <TouchableOpacity className="absolute items-center justify-center bottom-[6%] right-[6%] w-1/5 aspect-square rounded-full bg-primary">
                    <FontAwesome name="pencil" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <View>
                <TextInput className="dark:text-white"></TextInput>
                <Text className="text-sm dark:text-white">Full name:</Text>
                <TextInput
                    className="py-3 px-5  bg-gray-300 rounded-full"
                    autoCapitalize="none"
                    placeholder="Full name"
                    placeholderTextColor="gray"/>
                <View className="pt-4">
                    <TouchableOpacity className="items-center py-2 bg-primary rounded-full">
                        <Text className="text-white font-bold text-base">Update</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View>
                <TextInput className="dark:text-white"></TextInput>
                <Text className="text-sm dark:text-white">Email:</Text>
                <TextInput
                    className="py-3 px-5  bg-gray-300 rounded-full"
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor="gray"
                ></TextInput>
                <View className="pt-4">
                    <TouchableOpacity className="items-center py-2 bg-primary rounded-full">
                        <Text className="text-white font-bold text-base">Update</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <TextInput className="dark:text-white"></TextInput>
                <Text className="text-sm dark:text-white">Password:</Text>
                <TextInput
                    className="py-3 px-5  bg-gray-300 rounded-full"
                    autoCapitalize="none"
                    placeholder="Password"
                    placeholderTextColor="gray"
                ></TextInput>
                <View className="pt-4">
                    <TouchableOpacity className="items-center py-2 bg-primary rounded-full">
                        <Text className="text-white font-bold text-base">Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}