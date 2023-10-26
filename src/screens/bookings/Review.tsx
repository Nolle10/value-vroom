import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function ReviewScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();



    interface IconProps {
  size?: number;
  color?: string;
  id?:number;
  
}
  const [starColors, setStarColors] = useState(Array(5).fill("#f00000"));
const FullStar = ({ size = 24, color = "#000000", id = 0 }: IconProps) => {  // This have been taking from https://dev.to/mdmostafizurrahaman/how-to-make-a-rating-component-with-react-typescript-396p
  return (
    <div style={{ color: color }}
    
    onClick={()=>{
        handleStarPress(id);
    }}
    >
      <svg height={size} viewBox="0 0 24 24">
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  );

};

  const stars = starColors.map((color, index) => FullStar({
    size: 23, 
    color: color,
    id: index,
  }));


const handleStarPress = (index: number) => {
     const newStarColors = [...starColors];
     const unpicked:string = "#F00000";
     const picked:string = "#FFFF00"
        
     for (let i = 0; i<= 4;i++){
    newStarColors[i] = unpicked;}
       
     for (let i = 0; i<= index;i++){
    newStarColors[i] = picked;}
    setStarColors(newStarColors); 
};
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} className="bg-gray">
            <Text>Review</Text>
            <View style = {{flexDirection: 'row'}}>
                {stars}
</View>
            <Button
                title="Go to back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}