import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function InspectionScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [inspectionTopic, setInspectionTopic] = useState("");
    const [inspectionText, setInspectionText] = useState("");
    const [messageSent, setMessageSent] = useState(false);

    const submitInspection = () => {
        console.log("Topic:", inspectionTopic);
        console.log("Inspection:", inspectionText);
        setMessageSent(true);

        setInspectionTopic("");
        setInspectionText("");
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
                    className="h-10 border border-gray-300 rounded-md px-4 m-3 mb-10"
                    placeholder="Enter topic"
                    value={inspectionTopic}
                    onChangeText={(text) => setInspectionTopic(text)}
                />

                <Text lassName="text-base my-4">Inspection Details:</Text>
                <TextInput
                    className="h-32 border border-gray-300 rounded-md px-4 m-3"
                    placeholder="Describe your inspection"
                    multiline
                    value={inspectionText}
                    onChangeText={(text) => setInspectionText(text)}
                />

                <TouchableOpacity
                    className="bg-[#FFB703] py-2 rounded-md items-center my-5"
                    onPress={submitInspection}
                >
                    <Text className="text-white font-bold text-base">Submit Inspection</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}