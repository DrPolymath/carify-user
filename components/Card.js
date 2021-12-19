import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

const Card = ({ object, onPress, selectedObject }) => {

    const { colors } = useTheme();

    const selectedStyling = (object, selectedObject) => {
        if(selectedObject.some(item => item.id === object.id)){
            return "#FFFFA8"
        } else {
            return "white"
        }
    }

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: selectedStyling(object, selectedObject) }]}
            onPress={() => onPress(object)}
        >
            {object.url ? (
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: object.url,
                    }}
                />
            ) : (
                <View></View>
            ) }
            
            <Text style={{ textAlign: 'center', color: colors.primary}} numberOfLines={3} >
            {object.carBrandName}
            {object.carTypeName}
            {object.maxPrice ? (
                "< " + object.maxPrice
            ) : null}
            </Text>
        </TouchableOpacity>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        borderWidth: 0,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    },
})
