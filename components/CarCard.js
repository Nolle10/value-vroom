import React from 'react';
import { View, Image, Text, StyleSheet, Pressable  } from 'react-native';


const CarCard = props => {
    return (
        <Pressable onPress={() => console.log("User Pressed a Car ID: %s", props.ID)} style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden", margin: 15 }}>
          <View>
            <Image
              source={{uri: props.ImageURI}}
              style={{ width: 225, height: 175 }}
            />
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{fontWeight: 'Bold'}}>{props.CarName}</Text>
            <Text style={{ color: "#777" }}>
              Description of the image
            </Text>
          </View>
        </View>
      </Pressable>
    );
}


export default CarCard;