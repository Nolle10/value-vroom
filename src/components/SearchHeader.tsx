import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity, View, Text } from "react-native";
import { RadioButton } from 'react-native-paper';
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { FilterButton } from "./FilterButton";
import Slider from '@react-native-community/slider';

export function SearchHeader() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const drawerAnim = useRef(new Animated.Value(0)).current;
    const drawerFade = useRef(new Animated.Value(0)).current;
    const drawerHeight = 270;
    const animationDuration = 250;
    const [checked, setChecked] = useState('first');
    const [milagevalue, setMilage] = useState(0);
    const [hpvalue, sethp] = useState(0);
    const [distvalue, setDist] = useState(0);

    const toogleDrawer = () => {
        if (!drawerOpen) {
            Animated.parallel([
                Animated.timing(drawerAnim, {
                    toValue: drawerHeight,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
                Animated.timing(drawerFade, {
                    toValue: 1,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(drawerAnim, {
                    toValue: 0,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
                Animated.timing(drawerFade, {
                    toValue: 0,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Animated.View className="w-full bg-gray-200 dark:bg-gray-700 rounded-b-3xl pt-1 " style={{ paddingBottom: drawerAnim }}>
            <View className="z-10 w-full bg-gray-200 rounded-b-3xl flex-col justify-center pb-6 space-y-4">
                <Logo />
                <View className="flex-row mx-4 h-10">
                    <SearchBar />
                    <View className="w-3"></View>
                    <FilterButton onPress={toogleDrawer} />
                </View>
            </View>
            <Animated.View className="flex-1 z-1 absolute bottom-2 px-4 w-full text-center" style={{ opacity: drawerFade }}>
                <Text className="font-medium text-lg ml-2">Milage (km/l)</Text>
                <View className="flex-1 max-w-[65%] flex-row">
                    <View className="w-[80%]">
                        <Slider
                            className="w-200 h-40"
                            minimumValue={0}
                            maximumValue={1000}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            step={1}
                            onValueChange={setMilage}
                        />
                    </View>
                    <View className="pl-2">
                        <Text className="font-medium text-lg">{milagevalue}</Text>
                    </View>
                </View>
                <Text className="font-medium text-lg ml-2">Distance from me (km)</Text>
                <View className="flex-1 max-w-[65%] flex-row">
                    <View className="w-[80%]">
                        <Slider
                            className="w-200 h-40"
                            minimumValue={0}
                            maximumValue={1000}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            step={1}
                            onValueChange={setDist}
                        />
                    </View>
                    <View className="pl-2">
                        <Text className="font-medium text-lg">{distvalue}</Text>
                    </View>
                </View>
                <Text className="font-medium text-lg ml-2">Powertrain type</Text>
                <View className="flex-1 flex-row mb-3">
                    <Text >Gasolin</Text>
                    <RadioButton
                        value="Gasolin"
                        status={ checked === 'first' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('first')}
                    />
                    <Text className="ml-4">Diesl</Text>
                    <RadioButton
                        value="Diesl"
                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('second')}
                    />
                    <Text className="ml-4">Electrice</Text>
                    <RadioButton
                        value="Electrice"
                        status={ checked === 'third' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('third')}
                        
                    />
                </View>
                <Text className="font-medium text-lg ml-2">Engine power (BHP)</Text>
                <View className="flex-1 max-w-[65%] flex-row">
                    <View className="w-[80%]">
                        <Slider
                            className="w-200 h-40"
                            minimumValue={0}
                            maximumValue={1000}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#000000"
                            step={1}
                            onValueChange={sethp}
                        />
                    </View>
                    <View className="pl-2">
                        <Text className="font-medium text-lg">{hpvalue}</Text>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    )
}