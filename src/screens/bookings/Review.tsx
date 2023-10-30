import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Svg, { Polygon } from 'react-native-svg';
import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../api/apiUrl";

export function ReviewScreen({
  route
}: {
  route: any
}) {

  interface IconProps {
    size?: number;
    color?: string;
    id?: number;

  }
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [starColors, setStarColors] = useState(Array(5).fill("#f00000"));
  const [recommend, setRecommend] = useState(false);
  const [notRecommend, setNotRecommend] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const createReviewMutation = useMutation({
    mutationFn: async () => {
      let response = await fetch(`${baseUrl}/reviews`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          car_id: route.params.carId as any,
          rating: rating as any,
          review: reviewText,
        }).toString(),
      });
      if (response.status !== 200) {
        throw new Error('Error creating review');
      }
    }
  });

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
    const unpicked: string = "#F00000";
    const picked: string = "#FFFF00"
    for (let i = 0; i <= 4; i++) {
      newStarColors[i] = unpicked;
    }


    for (let i = 0; i <= index; i++) {
      newStarColors[i] = picked;
    }
    setStarColors(newStarColors);
    setRating(index + 1);
  };

  const handleSubmit = () => {
    createReviewMutation.mutate();
  };

  return (
    <ScrollView className="pt-8 px-2 bg-gray-600">
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

      {createReviewMutation.isError && (
        <Text className="text-red-500">
          Failed to create review, please try again.
        </Text>
      )}

      {createReviewMutation.isSuccess && (
        <Text className="text-green-500">
          Review created successfully!
        </Text>
      )}

      <TouchableOpacity
        className="text-lg bg-orange-500 text-white rounded-lg p-3 m-2"
        onPress={handleSubmit}
      >
        <Text className="text-lg">Submit Review</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

