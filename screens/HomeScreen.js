import React from 'react';
import { SafeAreaView, Image, Text, StyleSheet, ScrollView } from 'react-native';
import CarCard from '../components/CarCard';
import data from '../mock-data.json';

const HomeScreen = ({navigation}) => {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Recommended</Text>
        <ScrollView 
          style={styles.scrollView}
          horizontal>

          {data.map((data, idx) => (
            <CarCard ID={data.id}
                     ImageURI={data.imageURI}
                     CarName={data.name}
                     style={styles.tinyLogo} 
            />

          ))}
        
        </ScrollView>
      </SafeAreaView>
    );
}

export default HomeScreen;


const styles = StyleSheet.create({
    container: {
      //flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F2F2F2'
    },
    tinyLogo: {
      width: 175,
      height: 175,
      borderRadius: 15,
      marginRight: 25
    },
    scrollView: {
      width: '90%'
    },
});