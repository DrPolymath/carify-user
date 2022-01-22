import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import { connect } from 'react-redux';
import { removeSavedCar } from '../../actions/savedCar.action';

const SavedCarCard = ({ carInfo, removeSavedCar, handleSetViewCarDetails }) => {

    const { colors } = useTheme();

    const handleRemoveSavedCar = () => {
        removeSavedCar(carInfo)
    }

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() => handleSetViewCarDetails(carInfo, true)}>
            <IconButton 
                icon="delete"
                color={colors.placeholder}
                size={15}
                onPress={handleRemoveSavedCar}
                style={{ alignSelf: 'flex-end' }}
            />
            <Image
                style={{
                    width: 125,
                    height: 75,
                    resizeMode: 'contain',
                }}
                source={{ uri: carInfo.carModelUrl}}
            />
            <Text style={{ color: colors.primary, textAlign: 'center' }}>{carInfo.carBrandName} {carInfo.carModelName}</Text>
        </TouchableOpacity>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeSavedCar: (carInfo) => dispatch(removeSavedCar(carInfo))
    }
}

export default connect(null, mapDispatchToProps)(SavedCarCard)

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderWidth: 0,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    }
})
