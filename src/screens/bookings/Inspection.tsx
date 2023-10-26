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
                    placeholder="Enter topic"
                    value={inspectionTopic}
                    onChangeText={(text) => setInspectionTopic(text)}
                />

                <Text style={{ fontSize: 16, marginVertical: 10 }}>Inspection Details:</Text>
                <TextInput
                    style={{ height: 150, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 8 }}
                    placeholder="Describe your inspection"
                    multiline
                    value={inspectionText}
                    onChangeText={(text) => setInspectionText(text)}
                />

                <TouchableOpacity
                    style={{ backgroundColor: "#FFB703", padding: 10, borderRadius: 5, alignItems: 'center', marginVertical: 25 }}
                    onPress={submitInspection}
                >
                    <Text style={{ color: 'white', fontSize: 18 }}>Submit Inspection</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


    /*return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Inspection</Text>
            <Button
                title="Go to back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}*/