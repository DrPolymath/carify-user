import React, { useState } from 'react'
import { ActivityIndicator, Image, SafeAreaView, StatusBar, StyleSheet, ToastAndroid, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper';
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { saveInterestedCarBrand, saveInterestedCarType, saveInterestedPriceRange } from '../actions/profile.action';
import CarBrandList from '../components/CarBrandList';
import CarTypeList from '../components/CarTypeList';
import PriceRangeList from '../components/PriceRangeList';

const InterestScreen = (props) => {

    const { carBrands, carTypes, priceRanges, saveError } = props;
    const { colors } = useTheme();

    const [selectedCB, setSelectedCB] = useState([]);
    const handleSelectedCB = (value) => {
        if(selectedCB.some(item => item.carBrandName === value.carBrandName)){
            setSelectedCB(selectedCB.filter(item => item.carBrandName !== value.carBrandName))
        } else {
            let newSelectedCB = [
                ...selectedCB,
                {
                    id: value.id,
                    carBrandName: value.carBrandName,
                    url: value.url,
                }
            ]
            setSelectedCB(newSelectedCB);
        }
        
    };

    const [selectedCT, setSelectedCT] = useState([]);
    const handleSelectedCT = (value) => {
        if(selectedCT.some(item => item.carTypeName === value.carTypeName)){
            setSelectedCT(selectedCT.filter(item => item.carTypeName !== value.carTypeName))
        } else {
            let newSelectedCT = [
                ...selectedCT,
                {
                    id: value.id,
                    carTypeName: value.carTypeName,
                    url: value.url,
                }
            ]
            setSelectedCT(newSelectedCT);
        }
    };

    const [selectedPR, setSelectedPR] = useState([]);
    const handleSelectedPR = (value) => {
        if(selectedPR.some(item => item.id === value.id)){
            setSelectedPR(selectedPR.filter(item => item.id !== value.id))
        } else {
            let newSelectedPR = [
                ...selectedPR,
                {
                    id: value.id,
                    minPrice: value.minPrice,
                    maxPrice: value.maxPrice,
                }
            ]
            setSelectedPR(newSelectedPR);
        }
        
    };

    const handleSubmit = () => {
        if(!selectedCB.length){
            ToastAndroid.showWithGravity("Please select at least one interested car brand!", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if(!selectedCT.length){
            ToastAndroid.showWithGravity("Please select at least one interested car type!", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if(!selectedPR.length){
            ToastAndroid.showWithGravity("Please select at least one interested price range!", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            props.saveInterestedCarBrand(selectedCB)
            props.saveInterestedCarType(selectedCT)
            props.saveInterestedPriceRange(selectedPR)
            if(!saveError) {
                props.navigation.replace('Main')
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, marginLeft: 20 }}>
                <Image
                    style={{
                        width: 100,
                        resizeMode: 'contain'
                    }}
                    source={require('../assets/logo.png')}
                />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: colors.primary, fontSize: 22}}>SELECT YOUR INTEREST</Text>
                <Text style={{ color: colors.placeholder }}>Let us know your taste!</Text>
            </View>
            <View style={{ flex: 6 }}>
                <Swiper
                    showsButtons={true}
                    showsPagination={false}
                    loop={false}
                >
                    <View style={styles.slide}>
                        <Text style={styles.title}>Brand</Text>
                        <View style={styles.contentContainer}>
                            {carBrands ? (
                                <CarBrandList carBrands={carBrands} selectedCB={selectedCB} handleSelectedCB={handleSelectedCB}/>
                            ) : (
                                <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff"/>
                            )}
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.title}>Car Type</Text>
                        <View style={styles.contentContainer}>
                            {carTypes ? (
                                <CarTypeList carTypes={carTypes} selectedCT={selectedCT} handleSelectedCT={handleSelectedCT}/>
                            ) : (
                                <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff"/>
                            )}
                        </View>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.title}>Price Range</Text>
                        <View style={styles.contentContainer}>
                            {priceRanges ? (
                                <PriceRangeList priceRanges={priceRanges} selectedPR={selectedPR} handleSelectedPR={handleSelectedPR}/>
                            ) : (
                                <ActivityIndicator style={{ marginTop: 20 }} size="large" color="#0000ff"/>
                            )}
                        </View>
                        <Button mode='contained' style={{ marginBottom: 20 }} onPress={handleSubmit}>
                            Submit
                        </Button>
                    </View>
                </Swiper>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        carBrands: state.firestore.ordered.carBrand,
        carTypes: state.firestore.ordered.carType,
        priceRanges: state.firestore.ordered.priceRange,
        saveError: state.profile.saveError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveInterestedCarBrand: (selectedCB) => dispatch(saveInterestedCarBrand(selectedCB)),
        saveInterestedCarType: (selectedCT) => dispatch(saveInterestedCarType(selectedCT)),
        saveInterestedPriceRange: (selectedPR) => dispatch(saveInterestedPriceRange(selectedPR)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'carBrand' },
        { collection: 'carType' },
        { collection: 'priceRange' },

    ])
)(InterestScreen)

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        justifyContent: 'flex-start'
    },
    slide: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        color: '#5280E9',
        fontSize: 24,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 10,
    },
})
