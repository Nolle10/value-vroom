import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Modal from 'react-native-modal';

export function ModalWrapper(
    {
        title,
        children,
        isVisible,
        height,
        setModalVisible
    }: {
        title: string,
        children: React.ReactNode,
        isVisible: boolean,
        height: number,
        setModalVisible: (isVisible: boolean) => void
    }
) {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={() => setModalVisible(false)}
            onSwipeComplete={() => setModalVisible(false)}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            hasBackdrop={true}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={{ margin: 20 }}
        >
            <View className="bg-white rounded-2xl" style={{ maxHeight: height, height: height }}>
                <View className="p-2 bg-gray-200 rounded-t-2xl">
                    <Text className="text-lg font-bold">{title}</Text>
                </View>
                {children}
                <View className="flex-row justify-end space-x-2 p-2 bg-gray-200 rounded-b-2xl">
                    <TouchableOpacity className="bg-gray-300 rounded-full p-2 flex-row items-center space-x-1 " onPress={() => setModalVisible(false)}>
                        <Text className="text-gray-600">Cancel</Text>
                        <FontAwesome name="close" size={18} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-green-500 rounded-full p-2 flex-row items-center space-x-1" onPress={() => { setModalVisible(false) }}>
                        <Text className="text-gray-600">Confirm</Text>
                        <FontAwesome name="check" size={18} color="gray" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}