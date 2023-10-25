import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SettingScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Settings Page</Text>
      </View>
    );
}

export default SettingScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2'

    },
});