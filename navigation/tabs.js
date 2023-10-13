import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingScreen from "../screens/SettingScreen";
import HistoryScreen from "../screens/HistoryScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: { 
                    position: 'absolute',
                    elevation: 0,
                    height: 90,
                    ...styles.shadow
                },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icons/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? styles.focusColor :  styles.unFocusedColor
                            }}/>
                        <Text style={{color: focused ? styles.focusColor :  styles.focusColor, fontSize: 12}}>HOME</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="History" component={HistoryScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icons/calendar.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? styles.focusColor :  styles.focusColor
                            }}/>
                        <Text style={{color: focused ? styles.focusColor :  styles.focusColor, fontSize: 12}}>HISTORY</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Search" component={SearchScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icons/search.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? styles.focusColor :  styles.focusColor
                            }}/>
                        <Text style={{color: focused ? styles.focusColor :  styles.focusColor, fontSize: 12}}>SEARCH</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Settings" component={SettingScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={require('../assets/icons/settings.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? styles.focusColor :  styles.focusColor
                            }}/>
                        <Text style={{color: focused ? styles.focusColor :  styles.focusColor, fontSize: 12}}>SETTINGS</Text>
                    </View>
                ),
            }}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    focusColor: {
        color: '#E32F45',
    },
    unFocusedColor: {
        color: '#748c94',
    }
})

export default Tabs;