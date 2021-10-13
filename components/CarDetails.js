import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CarDetails = ({ selectedCar }) => {
    return (
        <View style={styles.container}>
            <Text>{selectedCar.carBrandName}</Text>
        </View>
    )
}

export default CarDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
