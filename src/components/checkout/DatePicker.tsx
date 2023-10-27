import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { BookingCalender } from './BookingCalender';
import { ModalWrapper } from './ModalWrapper';
import { format, isSameDay } from 'date-fns';
import { BookingTimePicker, timeslotToDate } from './BookingTimePicker';

function SelectionCard(
    {
        title,
        date,
        timeslot,
        onPressDate,
        onPressTime
    }: {
        title: string,
        date: Date | undefined,
        timeslot: string | undefined,
        onPressDate: () => void,
        onPressTime: () => void
    }
) {
    return (
        <View className="p-2 bg-white rounded-xl shadow-xl space-y-2">
            <Text className="text-gray-500">
                {title}
            </Text>
            <View className="flex-row justify-evenly pb-1">
                <View>

                </View>
                <TouchableOpacity onPress={onPressDate} className="flex-1 flex-row justify-center items-center space-x-1">
                    <FontAwesome name="calendar" size={18} color="gray" />
                    <Text className="text-xl text-center font-bold text-gray-600">
                        {format(date ?? new Date(), 'dd/MM/yyyy')}
                    </Text>
                    <FontAwesome name="caret-down" size={18} color="gray" />
                </TouchableOpacity>
                <View className="w-px h-full bg-gray-400"></View>
                <TouchableOpacity onPress={onPressTime} className="flex-1 flex-row justify-center items-center space-x-1">
                    <FontAwesome name="clock-o" size={18} color="gray" />
                    <Text className="text-xl font-bold text-gray-600 capitalize">
                        {timeslot ?? "Select Time"}
                    </Text>
                    <FontAwesome name="caret-down" size={18} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export function DatePicker(
    {
        carId,
        onDate
    }: {
        carId: number,
        onDate: (firstDate?: Date, firstTimeSlot?: string, secondDate?: Date, secondTimeslot?: string) => void
    }
) {
    const [isDatePickerVisible, setDatePickerVisibleRaw] = useState(false);
    const [firstDate, setFirstDate] = useState<Date | undefined>(new Date());
    const [secondDate, setSecondDate] = useState<Date | undefined>(new Date());

    const [isFirstTimePickerVisible, setFirstTimePickerVisible] = useState(false);
    const [isSecondTimePickerVisible, setSecondTimePickerVisible] = useState(false);
    const [firstTimeslot, setFirstTimeslotRaw] = useState<string>("now");
    const [secondTimeslot, setSecondTimeslot] = useState<string | undefined>(undefined);

    const setFirstTimeslot = (timeslot: string) => {
        if (secondTimeslot && timeslotToDate(timeslot, firstDate) > timeslotToDate(secondTimeslot, secondDate)) {
            setSecondTimeslot(undefined);
        }
        setFirstTimeslotRaw(timeslot);
    }

    const onSelectDate = (firstDate?: Date, secondDate?: Date) => {
        setFirstDate(firstDate);
        setSecondDate(secondDate);

        if (firstDate && secondDate && secondTimeslot && isSameDay(firstDate, secondDate) && timeslotToDate(firstTimeslot, firstDate) > timeslotToDate(secondTimeslot, secondDate)) {
            setSecondTimeslot(undefined);
        }
    }

    useEffect(() => {
        if (firstDate && secondDate && firstTimeslot && secondTimeslot) {
            onDate(firstDate, firstTimeslot, secondDate, secondTimeslot);
        } else if (firstDate && firstTimeslot && !secondDate && secondTimeslot && isDatePickerVisible) {
            onDate(firstDate, firstTimeslot, firstDate, secondTimeslot);
        } else {
            onDate();
        }
    }, [firstDate, secondDate, firstTimeslot, secondTimeslot]);


    const setDatePickerVisible = (visible: boolean) => {
        setDatePickerVisibleRaw(visible);

        if (!visible && !secondDate) {
            onSelectDate(firstDate, firstDate);
        }
    }

    return (
        <>
            <SelectionCard
                title='Pick-up Date'
                date={firstDate}
                timeslot={firstTimeslot}
                onPressDate={() => setDatePickerVisible(true)}
                onPressTime={() => setFirstTimePickerVisible(true)}

            />
            <SelectionCard
                title='Drop-off Date'
                date={secondDate}
                timeslot={secondTimeslot}
                onPressDate={() => setDatePickerVisible(true)}
                onPressTime={() => setSecondTimePickerVisible(true)}
            />
            <ModalWrapper
                title="Pick-up/Drop-off Date"
                height={600}
                isVisible={isDatePickerVisible}
                setModalVisible={setDatePickerVisible}
            >
                <BookingCalender
                    initialFirstDay={firstDate}
                    initialSecondDay={secondDate}
                    onSelectDate={onSelectDate}
                    carId={carId}
                />
            </ModalWrapper>
            <ModalWrapper
                title="Pick-up Time"
                height={350}
                isVisible={isFirstTimePickerVisible}
                setModalVisible={setFirstTimePickerVisible}
            >
                <BookingTimePicker timeslot={firstTimeslot} setTimeslot={setFirstTimeslot} />
            </ModalWrapper>
            <ModalWrapper
                title="Drop-off Time"
                height={350}
                isVisible={isSecondTimePickerVisible}
                setModalVisible={setSecondTimePickerVisible}
            >
                <BookingTimePicker
                    timeslot={secondTimeslot}
                    setTimeslot={setSecondTimeslot}
                    initialTimeslot={firstDate && secondDate && isSameDay(firstDate, secondDate) ? firstTimeslot : "00:00"}
                />
            </ModalWrapper>
        </>
    );
}