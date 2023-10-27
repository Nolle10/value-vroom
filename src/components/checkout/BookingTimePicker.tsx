import * as React from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import {roundToNearestMinutes, format, addMinutes, endOfDay, parse} from 'date-fns';

export function timeslotToDate(timeslot: string, date?: Date) {
    if(timeslot == "now") {
        return date ?? new Date();
    }
    return parse(timeslot, 'HH:mm', date ?? new Date());
}

export function BookingTimePicker(
    {
        timeslot,
        setTimeslot,
        initialTimeslot,
    } : {
        timeslot?: string,
        setTimeslot: (timeslot: string) => void
        initialTimeslot?: string
    }
) {
    const timeslots = [];
    let startTimeSlot = roundToNearestMinutes(new Date(), {nearestTo: 15, roundingMethod: 'ceil'});
    if (initialTimeslot) {
        if(initialTimeslot == "00:00") {
            startTimeSlot = timeslotToDate(initialTimeslot);
        } else if(initialTimeslot != "now") {
            startTimeSlot = addMinutes(timeslotToDate(initialTimeslot), 15);
        }
    } else {
        timeslots.push("now")
    }

    for (let i = startTimeSlot; i <= endOfDay(new Date()); i = addMinutes(i, 15)) {
        timeslots.push(format(i, 'HH:mm'));
    }

    return (
        <ScrollView className="p-2 px-4">
            {timeslots.map((current, index) => (
                <TouchableOpacity
                    key={index}
                    className={`p-2 flex bg-white  ${index == 0 && "border-t"} border-b ${timeslot == current && "brightness-95 border-l-4 border-l-gray-500"} border-gray-200`}
                    onPress={() => { setTimeslot(current) }}
                >
                    <Text className="text-gray-600 capitalize">{current}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}