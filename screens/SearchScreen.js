import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Search Page</Text>
      </View>
    );
}

export default SearchScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2'

    },
});