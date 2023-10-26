import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { CalendarList, DateData } from 'react-native-calendars';
import { useGetCarBookings } from '../../api/apiComponents'
import { getPrimaryColor } from '../../utility';
import { addDays, isSameDay, differenceInCalendarDays, format, isWithinInterval, areIntervalsOverlapping } from 'date-fns'
import { Booking } from '../../api/apiSchemas';

function formattedDate(date: Date) {
    return format(date, 'yyyy-MM-dd');
}

function getMarkedDatesDateData(day1?: Date, day2?: Date) {
    if (!day1 && !day2) {
        return {};
    }

    if (day1 && !day2) {
        return getMarkedDates(day1, day1, getPrimaryColor(), 'white');
    }

    if (!day1 || !day2) {
        return {};
    }

    return getMarkedDates(day1, day2, getPrimaryColor(), 'white');
}

function getMarkedDates(day1: Date, day2: Date, color: string, textColor: string) {
    if (isSameDay(day1, day2)) {
        return {
            [formattedDate(day1)]: { startingDay: true, endingDay: true, color: color, textColor: textColor },
        }
    }

    if (day1 > day2) {
        let temp = day1;
        day1 = day2;
        day2 = temp;
    }

    let currentDay = new Date(day1.getTime());
    let markedDates: any = {};
    while (isWithinInterval(currentDay, {
        start: day1,
        end: day2
    })) {
        markedDates[formattedDate(currentDay)] = { color: color, textColor: textColor };
        currentDay = addDays(currentDay, 1);
    }

    markedDates[formattedDate(day1)].startingDay = true;
    markedDates[formattedDate(day2)].endingDay = true;

    return markedDates;
}

function getAllMarkedDates(bookings: Booking[], day1?: Date, day2?: Date) {
    let markedDates = getMarkedDatesDateData(day1, day2);

    for (let booking of bookings) {
        let bookingStart = new Date(booking.start_date);
        let bookingEnd = new Date(booking.end_date);

        let bookingMarkedDates = getMarkedDates(bookingStart, bookingEnd, "lightgray", "white");
        for (let [date, data] of Object.entries(bookingMarkedDates)) {
            markedDates[date] = data;
        }
    }

    return markedDates;
}

export function BookingCalender(
    {
        initialFirstDay,
        initialSecondDay,
        onSelectDate,
        carId
    }: {
        initialFirstDay?: Date,
        initialSecondDay?: Date,
        onSelectDate: (day1?: Date, day2?: Date) => void,
        carId: number
    }) {
    const [calenderWidth, setCalenderWidth] = useState(0);
    const { data, error, isLoading } = useGetCarBookings({
        pathParams: {
            carId: carId
        }
    });

    let [firstClick, setFirstClick] = useState<Date | undefined>(initialFirstDay ?? new Date());
    let [secondClick, setSecondClick] = useState<Date | undefined>(initialSecondDay ?? new Date());

    const onDayPress = (day: DateData) => {
        const dayDate = new Date(day.timestamp);

        // If the click is in the past, do nothing
        if (differenceInCalendarDays(new Date(), dayDate) > 0) {
            return;
        }

        // If the click is inside a booking, do nothing
        if (data && data.some((booking) => {
            const bookingStart = new Date(booking.start_date);
            const bookingEnd = new Date(booking.end_date);

            if (isSameDay(dayDate, bookingStart) || isSameDay(dayDate, bookingEnd)) {
                return true;
            }

            if (isWithinInterval(dayDate, { start: bookingStart, end: bookingEnd })) {
                return true;
            }

            return false;
        })) {
            return;
        }

        if (firstClick && secondClick) {
            setFirstClick(new Date(day.timestamp));
            setSecondClick(undefined);
            onSelectDate(new Date(day.timestamp), undefined);
        }

        if (firstClick && !secondClick) {
            // Check if the date interval passes over a booking
            if (data && data.some((booking) => {
                const bookingStart = new Date(booking.start_date);
                const bookingEnd = new Date(booking.end_date);

                const clickInterval = dayDate > firstClick! ? { start: firstClick!, end: dayDate } : { start: dayDate, end: firstClick! };

                return areIntervalsOverlapping(clickInterval, { start: bookingStart, end: bookingEnd });
            })) {
                return;
            }

            setSecondClick(new Date(day.timestamp));
            if (dayDate > firstClick) {
                onSelectDate(firstClick, new Date(day.timestamp));
            } else {
                onSelectDate(new Date(day.timestamp), firstClick);
            }
        }

        if (!firstClick) {
            setFirstClick(new Date(day.timestamp));
            onSelectDate(new Date(day.timestamp), undefined);
        }
    };

    if (error) {
        return (
            <View className="flex-1 items-center justify-center ">
                <Text>
                    Failed to load bookings calender...
                </Text>
            </View>
        )
    }

    return (
        <View className="flex-1 " onLayout={(event) => {
            setCalenderWidth(event.nativeEvent.layout.width);
        }}>
            {isLoading && <ActivityIndicator size="large" color={getPrimaryColor()} />}
            {!isLoading && calenderWidth != 0 && <CalendarList
                className='rounded-xl shadow'
                calendarStyle={undefined}
                markingType={'period'}
                futureScrollRange={2}
                pastScrollRange={0}
                collapsable={true}
                calendarWidth={calenderWidth}
                onDayPress={onDayPress}
                markedDates={getAllMarkedDates(data, firstClick, secondClick)} />}
        </View>
    );
}
