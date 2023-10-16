import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export function SearchBar() {
    (window as any).searchref = React.useRef(null);
    return (
        <View className="flex-1 flex-row grow ">
            <View className="items-center justify-center text-white bg-primary pl-4 rounded-l-2xl">
                <FontAwesome5 name="search" size={20} color="white" />
            </View>
            <TextInput ref={(window as any).searchref} inlineImageLeft='' placeholderTextColor="white" className="flex-1 text-white bg-primary pl-2 pr-5 rounded-r-2xl" placeholder="Search..."/>
        </View>
    );
}