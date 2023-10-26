import React from "react";
import { View, Button, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthenticationStore, AuthenticationState } from "../../utility/authentication";

export function LoginScreen() {
    const authenticationStore = useAuthenticationStore();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    React.useEffect(() => {
        if (authenticationStore.state === AuthenticationState.Authenticated) {
            navigation.goBack();
        }
    }, [authenticationStore.state]);

    return (
        <View className="flex-1 py-4 px-12 mt-12 space-y-6">
            <Text className="text-2xl font-bold text-center">Sign in to ValueVroom</Text>

            {
                authenticationStore.state === AuthenticationState.Error && (
                    <Text className="text-red-800 text-sm p-4 rounded-lg bg-red-200">Incorrect username or password! {authenticationStore.token}</Text>
                )
            }

            <View className="space-y-2">
                <Text className="text-sm">Username:</Text>
                <TextInput
                    className="py-3 px-5  bg-gray-300 rounded-full"
                    autoCapitalize="none"
                    placeholder="Username"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setUsername(text)}
                ></TextInput>
            </View>

            <View className="space-y-2">
                <View className="flex-row justify-between">
                    <Text className="text-sm ">Password:</Text>
                    <Text className="text-sm text-gray-600 underline">Forgot password?</Text>
                </View>
                <TextInput
                    className="py-3 px-5 bg-gray-300 rounded-full"
                    placeholder="********"
                    secureTextEntry={true}
                    placeholderTextColor="gray"
                    onChangeText={(text) => setPassword(text)}
                ></TextInput>
            </View>

            <TouchableOpacity className="items-center py-2 bg-primary rounded-full" onPress={() => {
                authenticationStore.login(username, password)
            }} >
                <Text className="text-white font-bold text-base">Sign In</Text>
            </TouchableOpacity>

            <View className="flex-row space-x-1">
            <Text className="text-sm ">Don't have an account?</Text>
            <Text className="text-sm underline font-bold">Sign Up</Text>
            </View>
        </View>
    );
}
