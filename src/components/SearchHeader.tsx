import React, { useRef } from "react";
import { Animated, TouchableOpacity, View, Text } from "react-native";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { FilterButton } from "./FilterButton";


export function SearchHeader() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const drawerAnim = useRef(new Animated.Value(0)).current;
    const drawerFade = useRef(new Animated.Value(0)).current;
    const drawerHeight = 80;
    const animationDuration = 250;

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
        <Animated.View className="w-full bg-gray-200 dark:bg-gray-700 rounded-b-3xl pt-1" style={{ paddingBottom: drawerAnim }}>
            <View className="z-10 w-full bg-gray-200 rounded-b-3xl flex-col justify-center pb-6 space-y-4">
                <Logo />
                <View className="flex-row mx-4 h-10">
                    <SearchBar />
                    <View className="w-3"></View>
                    <FilterButton onPress={toogleDrawer} />
                </View>
            </View>
            <Animated.View className="z-1 absolute bottom-2 px-4 w-full" style={{ opacity: drawerFade }}>
                <Text>Option 1</Text>
                <Text>Option 2</Text>
                <Text>Option 3</Text>
                <Text>Option 4</Text>
            </Animated.View>
        </Animated.View>
    )
}