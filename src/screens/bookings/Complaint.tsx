import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function ComplaintScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [complaintTopic, setComplaintTopic] = useState("");
    const [complaintText, setComplaintText] = useState("");
    const [messageSent, setMessageSent] = useState(false);

    const submitComplaint = () => {
        setMessageSent(true);

    
        setComplaintTopic("");
        setComplaintText("");
    };

    return (
        <ScrollView className="flex-1">
            <View className="p-5">
                {messageSent && (
                    <Text className="bg-lime-300 p-10 rounded-md text-base text-green-500 text-center my-10">
                        Message Sent
                    </Text>
                )}  

                <Text className="dark:text-white text-base my-10">Topic:</Text>
                <TextInput
                    className="h-20 border-gray-400 border rounded-md p-8 dark:text-white"
                    placeholder="Enter complaint topic"
                    value={complaintTopic}
                    onChangeText={(text) => setComplaintTopic(text)}
                />

                <Text className="text-base my-10 dark:text-white">Complaint Details:</Text>
                <TextInput
                    className="h-150 border-gray-400 border rounded-md p-8 dark:text-white"
                    placeholder="Describe your complaint"
                    multiline
                    value={complaintText}
                    onChangeText={(text) => setComplaintText(text)}
                />

            <View className="pt-10">
                <TouchableOpacity
                    className="bg-[#FFB703] p-10 rounded-md items-center my-25"
                    onPress={submitComplaint}>

                    <Text className="text-white text-base">Submit Complaint</Text>
                </TouchableOpacity>
            </View>
               
            </View>
        </ScrollView>
    );
}
