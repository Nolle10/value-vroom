import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function ContactUsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [fromEmail, setFromEmail] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailText, setEmailText] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const phoneNumber = "80 80 20 20"; 
  
    const sendEmail = () => {
        console.log("From Email:", fromEmail);
        console.log("Email Subject:", emailSubject);
        console.log("Email Text:", emailText);
        setMessageSent(true);
  
        setFromEmail("");
        setEmailSubject("");
        setEmailText("");
    };
  
    return (
        <ScrollView className="flex-1">
            <View className="p-4">
                {messageSent && (
                    <Text className="bg-lime-200 p-2 text-lg text-green-600 py-2 text-center rounded-md items-center my-5">
                        Message Sent
                    </Text>
                )}
                <Text className="text-lg my-4">Phone:</Text>
                <Text className="text-base my-1 py-2 bg-gray-200 text-gray-500 text-center rounded-md">Contact us at: {phoneNumber}</Text>

                <Text className="text-lg my-4">Email:</Text>
                <Text className="text-base my-1 py-2 bg-gray-200 text-gray-500 text-center rounded-md">contact@example.com</Text>

                <TouchableOpacity
                    className="bg-[#FFB703] py-2 px-1 rounded-md items-center my-5 "
                    onPress={() => Linking.openURL('mailto:support@example.com') }
                >
                    <Text className="text-white font-bold text-base">Send Email</Text>
                </TouchableOpacity>
                
            </View>
        </ScrollView>
    );
}
