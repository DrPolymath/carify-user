import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const InputCompareCardFirst = (props) => {

    const { carBrands, carModels, carVariants, carBrand, handleSetCarBrand, carModel, handleSetCarModel, carVariant, handleSetCarVariant } = props;
    if (carBrands && carModels && carVariants ) {

        let processedCarModels = Object.entries(carModels).map(key => ({ ...key[1], id:key[0], }));
        processedCarModels = processedCarModels.map(item => {
            return {
                ...item,
                key: item.id,
                label: item.carModelName,
                value: item.id,
            };
        })

        let processedCarVariants = Object.entries(carVariants).map(key => ({ ...key[1], id:key[0], }));
        processedCarVariants = processedCarVariants.map(item => {
            return {
                ...item,
                key: item.id,
                label: item.carVariantName,
                value: item.id,
            };
        })

        const [openCarBrand, setOpenCarBrand] = useState(false);
        const [carBrandList, setCarBrandList] = useState(carBrands.map(item => {
            return {
                ...item,
                key: item.id,
                label: item.carBrandName,
                value: item.id,
            };
        }));

        const [openCarModel, setOpenCarModel] = useState(false);
        const [carModelList, setCarModelList] = useState(processedCarModels);

        useEffect(() => {
            if(carBrand){
                let data = processedCarModels.filter(item => item.cbId === carBrand)
                setCarModelList(data)
            }
            
        }, [carBrand])

        const [openCarVariant, setOpenCarVariant] = useState(false);
        const [carVariantList, setCarVariantList] = useState(processedCarVariants);

        useEffect(() => {
            if(carModel){
                let data = processedCarVariants.filter(item => item.cmId === carModel)
                setCarVariantList(data)
            }
        }, [carModel])

        return (
            <View style={styles.cardContainer}>
                <Image 
                    source={require('../assets/car_placeholder.png')}
                    style={{
                        width: 225,
                        height: 175,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }}
                />
                <View>

                    <DropDownPicker
                        dropDownDirection="TOP"
                        placeholder="Select Car Brand"
                        open={openCarBrand}
                        value={carBrand}
                        items={carBrandList}
                        setOpen={setOpenCarBrand}
                        setValue={val => handleSetCarBrand(val)}
                        setItems={setCarBrandList}
                    />
                    
                    <DropDownPicker
                        disabled={carBrand === null}
                        // disabledStyle={{
                        //     opacity: 0.5
                        // }}
                        containerStyle={{
                            marginTop: 20
                        }}
                        dropDownDirection="TOP"
                        placeholder="Select Car Model"
                        open={openCarModel}
                        value={carModel}
                        items={carModelList}
                        setOpen={setOpenCarModel}
                        setValue={val => handleSetCarModel(val)}
                        setItems={setCarModelList}
                    />

                    <DropDownPicker
                        disabled={carModel === null}
                        // disabledStyle={{
                        //     opacity: 0.5
                        // }}
                        containerStyle={{
                            marginTop: 20
                        }}
                        dropDownDirection="TOP"
                        placeholder="Select Car Variant"
                        open={openCarVariant}
                        value={carVariant}
                        items={carVariantList}
                        setOpen={setOpenCarVariant}
                        setValue={val => handleSetCarVariant(val)}
                        setItems={setCarVariantList}
                    />

                </View>
            </View>
        )

    } else {
        return (
            <View>
                <Text></Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carBrands: state.firestore.ordered.carBrandFirst,
        carModels: state.firestore.data.carModelFirst,
        carVariants: state.firestore.data.carVariantFirst,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { 
            collection: 'carBrand',
            storeAs: 'carBrandFirst'
        },
        {
            collectionGroup: 'carModel',
            storeAs: 'carModelFirst'
        },
        {
            collectionGroup: 'carVariant',
            storeAs: 'carVariantFirst'
        }
    ])
)(InputCompareCardFirst)

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        margin: 40,
        padding: 20,
        borderWidth: 0,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    }
})
