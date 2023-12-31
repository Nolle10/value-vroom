import React, { useState } from "react";
import { View, Button, Text , TouchableOpacity, TextInput, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Svg, { Polygon } from 'react-native-svg';

export function ReviewScreen() {

    interface IconProps {
  size?: number;
  color?: string;
  id?:number;
  
}
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [starColors, setStarColors] = useState(Array(5).fill("#f00000"));
  const [recommend, setRecommend] = useState(false);
  const [notRecommend, setNotRecommend] = useState(false);
  const [reviewText, setReviewText] = useState('');
const FullStar = ({ size = 24, color = "#000000", id = 0 }: IconProps) => { 
  return (
    <TouchableOpacity onPress={() => handleStarPress(id)}>
    <View>
      <Svg height={size} width={size}>
        <Polygon
          points="50,0 61.8,35.5 98.5,35.5 68.2,57.3 79,92.7 50,71.5 21,92.7 31.8,57.3 1.5,35.5 38.2,35.5"
          fill={color}
          scale={size / 100}
        />
      </Svg>
    </View>
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
       
     for (let i = 0; i <= index;i++){
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
        <View className="flex-1 flex flex-col items-center justify-center bg-gray-600">
        <Text className="text-2xl font-bold text-white">Review Your Experience</Text>
        <Text className="text-white text-center">We'd love to hear about your experience renting a car from Value Vroom.</Text>
  
        <View className="flex flex-row my-5">
          {stars}
        </View>
  
        <TextInput 
          className="h-24 w-4/5 border rounded bg-white p-3"
          multiline={true}
          numberOfLines={4}
          placeholder="Leave your review here..."
          onChangeText={(text) => setReviewText(text)}
          value={reviewText}
        />
  
        <Text className="text-white my-3">Would you recommend this service to a friend?</Text>
  
        <View className="flex flex-row">
          <TouchableOpacity 
            className={`text-lg rounded-lg p-3 m-2 ${recommend ? 'bg-green-500' : 'bg-white'}`}
            onPress={() => {
              setRecommend(true);
              setNotRecommend(false);
            }}
          >
            <Text className="text-lg">Yes</Text>
          </TouchableOpacity>
  
          <TouchableOpacity 
            className={`text-lg rounded-lg p-3 m-2 ${notRecommend ? 'bg-red-500' : 'bg-white'}`}
            onPress={() => {
              setNotRecommend(true);
              setRecommend(false);
            }}
          >
            <Text className="text-lg">No</Text>
          </TouchableOpacity>
        </View>
  
        <TouchableOpacity 
          className="text-lg bg-orange-500 text-white rounded-lg p-3 m-2"
          onPress={handleSubmit}
        >
          <Text className="text-lg">Submit Review</Text>
        </TouchableOpacity>
      </View>
    );
  };

  