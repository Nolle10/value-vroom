import React from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAuthenticationStore, AuthenticationState } from "../../utility/authentication";

export function SignUpScreen() {
    const authenticationStore = useAuthenticationStore();
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [email, setEmail] = React.useState("");
    const [full_name, setFullName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    React.useEffect(() => {
        if (authenticationStore.state === AuthenticationState.Authenticated) {
            navigation.goBack();
        }
    }, [authenticationStore.state]);

    return (
        <ScrollView>
        <View className="flex-1 py-4 px-12 mt-12 space-y-6">
            <Text className="text-2xl font-bold text-center">Sign Up for ValueVroom</Text> 
            
            {/* Show an error message if the sign-up process fails */}
            {
                authenticationStore.state === AuthenticationState.Error && (
                    <Text className="text-red-800 text-sm p-4 rounded-lg bg-red-200">Registration failed: {authenticationStore.errorMessage}</Text>
                )
            }
            
            {/* Input field for email */}
            <View className="space-y-2">
                <Text className="text-sm">Email:</Text>
                <TextInput
                    className="py-3 px-5 bg-gray-300 rounded-full"
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setEmail(text)}
                ></TextInput>
            </View>

            {/* Input field for full name */}
            <View className="space-y-2">
                <Text className="text-sm">Full name:</Text>
                <TextInput
                    className="py-3 px-5 bg-gray-300 rounded-full"
                    autoCapitalize="none"
                    placeholder="Full name"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setFullName(text)}
                ></TextInput>
            </View>

            {/* Input field for username */}
            <View className="space-y-2">
                <Text className="text-sm">Username:</Text>
                <TextInput
                    className="py-3 px-5 bg-gray-300 rounded-full"
                    autoCapitalize="none"
                    placeholder="Username"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setUsername(text)}
                ></TextInput>
            </View>

            {/* Input field for password */}
            <View className="space-y-2">
                <Text className="text-sm">Password:</Text>
                <TextInput
                    className="py-3 px-5 bg-gray-300 rounded-full"
                    placeholder="********"
                    secureTextEntry={true}
                    placeholderTextColor="gray"
                    onChangeText={(text) => setPassword(text)}
                ></TextInput>
            </View>

            {/* Link to the login screen */}
            <View className="flex-row space-x-1">
                <Text className="text-sm">Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text className="text-sm underline font-bold">Sign In</Text>
                </TouchableOpacity>
            </View>

            {/* Button to initiate the sign-up process */}
            <TouchableOpacity className="items-center py-2 bg-primary rounded-full" onPress={() => {
                authenticationStore.signup(email, full_name, username, password)
            }} >
                <Text className="text-white font-bold text-base">Sign Up</Text>
            </TouchableOpacity>

        
        </View>
        </ScrollView>
    );
}
