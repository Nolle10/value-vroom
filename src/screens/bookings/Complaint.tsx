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
        console.log("Topic:", complaintTopic);
        console.log("Complaint:", complaintText);
        setMessageSent(true); 
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>

                {messageSent && (
                <Text style={{ backgroundColor: "lightgreen", padding: 10, borderRadius: 5, fontSize: 16, color: "green", textAlign: 'center', marginVertical: 10 }}>
                Message Sent
                </Text>
                )}  


                <Text style={{ fontSize: 16, marginVertical: 10 }}>Topic:</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 8 }}
                    placeholder="Enter complaint topic"
                    value={complaintTopic}
                    onChangeText={(text) => setComplaintTopic(text)}
                />

                <Text style={{ fontSize: 16, marginVertical: 10 }}>Complaint Details:</Text>
                <TextInput
                    style={{ height: 150, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 8 }}
                    placeholder="Describe your complaint"
                    multiline
                    value={complaintText}
                    onChangeText={(text) => setComplaintText(text)}
                />

                <TouchableOpacity
                    style={{ backgroundColor: "#FFB703", padding: 10, borderRadius: 5, alignItems: 'center', marginVertical: 25 }}
                    onPress={submitComplaint}
                >
                    <Text style={{ color: 'white', fontSize: 18 }}>Submit Complaint</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}
