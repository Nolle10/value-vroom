import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { baseUrl } from '../api/apiUrl';
import { Car } from '../api/apiSchemas';

export function CarImage(
    { car } : {
        car: Car
    }
) {
    return (
        <Image className="h-32" style={{ resizeMode: "contain" }} source={{ uri: baseUrl + "/images/" + car.car_model?.image_name }} />
    );
}