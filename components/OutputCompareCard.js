import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button, IconButton, useTheme } from 'react-native-paper'
import { connect } from 'react-redux';
import { addSavedCar } from '../actions/savedCar.action';

const OutputCompareCard = ({ carBrandObject, carModelObject, carVariantObject, handleClear, carVariant, addSavedCar }) => {

    const { colors } = useTheme();

    const saveCar = () => {
        let carInfo = {
            carBrandId: carModelObject.cbId,
            carBrandName: carBrandObject.carBrandName,
            carBrandImgUrl: carBrandObject.url,
            carModelId: carVariantObject.cmId,
            carModelName: carModelObject.carModelName,
            carModelImgUrl: carModelObject.url,
            carVariantId: carVariant,
            carVariantName: carVariantObject.carVariantName,
            price: carVariantObject.price
        }
        addSavedCar(carInfo);
    }

    return (
        <View style={styles.cardContainer}>
            <IconButton
                icon="close"
                size={20}
                onPress={() => handleClear()}
                style={{ alignSelf: 'flex-end' }}
            />
            
            <View style={{ alignItems: "center" }}>
                <Image
                    style={{
                        width: 200,
                        height: 150,
                        resizeMode: 'contain',
                    }}
                    source={{ uri: carModelObject.url}}
                />
                <Text style={{ color: colors.primary, fontSize: 24 }}>{carBrandObject.carBrandName} {carModelObject.carModelName}</Text>
                <Text style={{ marginVertical: 10 }}>{carVariantObject.carVariantName}</Text>
                <Text style={{ color: colors.placeholder, fontSize: 24 }}>{carVariantObject.price}</Text>
                <Button mode='contained' style={{ marginVertical: 10 }} onPress={saveCar}>
                    Save
                </Button>
            </View>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        addSavedCar: (carInfo) => dispatch(addSavedCar(carInfo))
    }
}

export default connect(null, mapDispatchToProps)(OutputCompareCard)

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        margin: 40,
        padding: 10,
        borderWidth: 0,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    }
})
