import React, { useState } from 'react'
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button, IconButton, useTheme } from 'react-native-paper'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { updateClick } from '../actions/recommendation.action';
import { addSavedCar } from '../actions/savedCar.action';

const OutputCompareCard = ({ carBrandObject, carModelObject, carVariantObject, handleClear, carVariant, addSavedCar, updateClick, savedCars }) => {

    const { colors } = useTheme();
    const [savedCarList, setSavedCarList] = useState(null);
    const [open, setOpen] = useState([]);

    // useEffect(() => {
    //     setOpen(carBrandObject)
    //     if(carBrandObject&&open.length!=0){
    //         let clickedCar = {
    //             carBrandId: carModelObject.cbId,
    //             carModelId: carVariantObject.cmId,
    //             carVariantId: carVariant,
    //             carVariantName: carVariantObject.carVariantName,
    //             price: carVariantObject.price,
    //             maleClick: carVariantObject.maleClick,
    //             femaleClick: carVariantObject.femaleClick,
    //             totalClick: carVariantObject.totalClick
    //         }
    //         updateClick(clickedCar)
    //     }
    // }, [carBrandObject]);

    useEffect(() => {
        if(savedCars){
            setSavedCarList(savedCars)
        }
    }, [savedCars]);
    

    const saveCar = () => {
        let carInfo = {
            carBrandId: carModelObject.cbId,
            carBrandName: carBrandObject.carBrandName,
            carBrandUrl: carBrandObject.url,
            carModelId: carVariantObject.cmId,
            carModelName: carModelObject.carModelName,
            carModelUrl: carModelObject.url,
            bodyType: carModelObject.bodyType,
            carVariantId: carVariant,
            carVariantName: carVariantObject.carVariantName,
            price: carVariantObject.price,
        }

        let clickInfo = {
            maleClick: carVariantObject.maleClick,
            femaleClick: carVariantObject.femaleClick,
            totalClick: carVariantObject.totalClick
        }
        addSavedCar(carInfo, clickInfo)
    }

    if(savedCarList){
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
                    
                    {!savedCarList.find((element) => {return element.carVariantId === carVariant}) ? (
                        <Button mode='contained' style={{ marginVertical: 10 }} onPress={saveCar}>
                            Save
                        </Button>
                    ) : null}
                </View>
            </View>
        )
    } else {
        return (
            <View>
                
            </View>
        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        savedCars: state.firestore.ordered.savedCar,
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addSavedCar: (carInfo, clickInfo) => dispatch(addSavedCar(carInfo, clickInfo)),
        updateClick: (carInfo) => dispatch(updateClick(carInfo)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect( (props) => ([
        { 
            collection: 'users',
            doc: props.auth.uid,
            subcollections:[
                {
                    collection: 'savedCar',
                }
            ],
            storeAs:'savedCar'
        }
    ]))
)(OutputCompareCard)

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        margin: 30,
        padding: 10,
        borderWidth: 0,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    }
})
