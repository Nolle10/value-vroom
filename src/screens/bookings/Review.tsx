import React, { useState } from "react";
import { View, Button, Text ,TouchableOpacity,TextInput, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Svg, { Path } from 'react-native-svg';

export function ReviewScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

console.log("Review loaded")

    interface IconProps {
  size?: number;
  color?: string;
  id?:number;
  
}
  const [starColors, setStarColors] = useState(Array(5).fill("#f00000"));
  const [recommend, setRecommend] = useState(false);
  const [notRecommend, setNotRecommend] = useState(false);
  const [reviewText, setReviewText] = useState('');
const FullStar = ({ size = 24, color = "#000000", id = 0 }: IconProps) => {  // This have been taking from https://dev.to/mdmostafizurrahaman/how-to-make-a-rating-component-with-react-typescript-396p
  return (
    <TouchableOpacity
    onPress={() => handleStarPress(id)}>
      <Svg height={size} viewBox="0 0 24 24">
        <Path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill={color}
        />
        <Path d="M0 0h24v24H0z" fill="none" />
      </Svg>
  </TouchableOpacity>
);
};
const stars = starColors.map((color, index) => (
    <FullStar
      key={index}  
      size={23}
      color={color}
      id={index}
    />
  ));


const handleStarPress = (index: number) => {
     const newStarColors = [...starColors];
     const unpicked:string = "#F00000";
     const picked:string = "#FFFF00"
        console.log("pressed")
     for (let i = 0; i<= 4;i++){
    newStarColors[i] = unpicked;}
       
     for (let i = 0; i<= index;i++){
    newStarColors[i] = picked;}
    setStarColors(newStarColors); 
};
const handleSubmit = () => {

    Alert.alert(
        "Thank you!",
        "Your review has been submitted to the nearest trash can.",
        [
            {text: "OK", onPress: () => navigation.goBack()}
        ]
    );
};

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Review Your Experience</Text>
        <Text style={{ color: 'white', textAlign: 'center' }}>We'd love to hear about your experience renting a car from Value Vroom.</Text>
        
        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
            {stars}
        </View>

        <TextInput 
            style={{ height: 100, width: '80%', borderColor: 'white', borderWidth: 1, backgroundColor: 'white', padding: 10 }}
            multiline={true}
            numberOfLines={4}
            placeholder="Leave your review here..."
            onChangeText={text => setReviewText(text)}
            value={reviewText}
        />

        <Text style={{ color: 'white', marginVertical: 10 }}>Would you recommend this service to a friend?</Text>
        
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setRecommend(true)}>
                <Text style={{ color: recommend ? 'green' : 'white' }}>Yes</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setNotRecommend(true)}>
                <Text style={{ color: notRecommend ? 'red' : 'white', marginLeft: 20 }}>No</Text>
            </TouchableOpacity>
        </View>

        <Button
            title="Submit Review"
         
            onPress={handleSubmit}
        />
    </View>
);
}