import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { getPrimaryColor } from '../utility';

export function FilterButton({onPress} : {onPress: () => void}) {
    return (
        <View className="aspect-square">
                            <TouchableOpacity className="grow rounded-full bg-white justify-center items-center" onPress={onPress} >
                <FontAwesome5 name="sliders-h" size={22} color={getPrimaryColor()} />
            </TouchableOpacity>
        </View>
    );
}