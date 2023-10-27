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
            <View className="p-4">
                {messageSent && (
                    <Text className=" bg-lime-200 p-2 text-lg text-green-600 py-2 text-center rounded-md items-center my-5">
                        Message Sent
                    </Text>
                )}  

                <Text lassName="text-base my-4">Topic:</Text>
                <TextInput
                    className="h-10 border border-gray-300 rounded-md px-4 m-1 p-2"
                    placeholder="Enter complaint topic"
                    value={complaintTopic}
                    onChangeText={(text) => setComplaintTopic(text)}
                />

                <Text className="text-base my-4">Complaint Details:</Text>
                <TextInput
                    className="h-32 border border-gray-300 rounded-md px-4 m-1 p-3"
                    placeholder="Describe your complaint"
                    multiline
                    value={complaintText}
                    onChangeText={(text) => setComplaintText(text)}
                />

            <TouchableOpacity
                    className="bg-[#FFB703] py-2 rounded-md items-center my-5"                    
                    onPress={submitComplaint}>

                    <Text className="text-white text-base">Submit Complaint</Text>
                </TouchableOpacity>
               
            </View>
        </ScrollView>
    );
}
