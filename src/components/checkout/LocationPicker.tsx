import * as React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { useState } from 'react';
import { ModalWrapper } from './ModalWrapper';
import { BookingCalender } from './BookingCalender';

export enum LocationType {
    Pickup,
    Dropoff
}

function locationLabel(locationType: LocationType) {
    switch (locationType) {
        case LocationType.Pickup:
            return "Pick-up Location";
        case LocationType.Dropoff:
            return "Drop-off Location";
    }
}

export function LocationPicker(
    {
        disabled,
        defaultLocation,
        locationType,
        onSelect
    }: {
        disabled: boolean,
        defaultLocation: string,
        locationType: LocationType,
        onSelect: (location: string) => void
    }
) {
    const [isVisible, setModalVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

    const locations = [
        "ODENSE - DENMARK",
        "COPENHAGEN - DENMARK",
        "AARHUS - DENMARK",
        "VEJLE - DENMARK",
        "AALBORG - DENMARK",
        "BILLUND - DENMARK",
        "KOLDING - DENMARK",
        "ESBJERG - DENMARK",
    ];

    return (
        <>
            <TouchableOpacity className={`p-4 bg-white space-y-1 rounded-xl shadow-xl ${disabled && "brightness-75 pointer-events-none"}`}
                onPress={() => { setModalVisible(true) }} >
                <Text className="text-gray-500">
                    {locationLabel(locationType)}
                </Text>
                <View className="flex-row items-center space-x-1">
                    <Text className="text-xl font-bold text-gray-600">
                        {selectedLocation}
                    </Text>
                    {!disabled && <FontAwesome name="caret-down" size={18} color="gray" />}
                </View>
            </TouchableOpacity>
            <ModalWrapper title={`Select ${locationLabel(locationType)}`} height={500} isVisible={isVisible} setModalVisible={setModalVisible}>
                <ScrollView className="p-2 px-4">
                    {locations.map((location, index) => (
                        <TouchableOpacity
                            key={index}
                            className={`p-2 flex bg-white  ${index == 0 && "border-t"} border-b ${selectedLocation == location && "brightness-95 border-l-4 border-l-gray-500"} border-gray-200`}
                            onPress={() => { setSelectedLocation(location) }}
                        >
                            <Text className="text-gray-600">{location}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ModalWrapper>
        </>
    );
}