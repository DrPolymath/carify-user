import React, { useEffect, useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Button, useTheme } from 'react-native-paper';
import Swiper from 'react-native-swiper'
import InfoTable from './InfoTable';
import { connect, useSelector } from 'react-redux';
import { firestoreConnect, useFirestoreConnect } from 'react-redux-firebase';
import PhotoList from './PhotoList';
import { addSavedCar } from '../actions/savedCar.action';
import { compose } from 'redux';
import EngineTable from './tables/EngineTable';
import PerformanceTable from './tables/PerformanceTable';
import TransmissionTable from './tables/TransmissionTable';

const CarDetails = ({ selectedCar, handleSetViewCarDetails, home, addSavedCar, explore, savedCars }) => {
    const { colors } = useTheme();
    const swiper = useRef(null);
    const [carDetailsTabActive, setCarDetailsTabActive] = useState(true);
    const [photosTabActive, setPhotosTabActive] = useState(false);
    const [savedCarList, setSavedCarList] = useState(null);

    useFirestoreConnect([
        {
            collection: 'carBrand',
            doc: selectedCar.carBrandId,
            subcollections: [
                {
                    collection: 'carModel',
                    doc: selectedCar.carModelId,
                    subcollections: [
                        {
                            collection: 'photos',
                        }
                    ]
                }
            ],
            storeAs: 'photos',
        },
        // Colors
        {
            collection: 'carBrand',
            doc: selectedCar.carBrandId,
            subcollections: [
                {
                    collection: 'carModel',
                    doc: selectedCar.carModelId,
                    subcollections: [
                        {
                            collection: 'carVariant',
                            doc: selectedCar.carVariantId,
                            subcollections: [
                                {
                                    collection: 'colors'
                                }
                            ]
                        }
                    ]
                }
            ],
            storeAs: 'colors',
        },
        {
            collection: 'carBrand',
            doc: selectedCar.carBrandId,
            subcollections: [
                {
                    collection: 'carModel',
                    doc: selectedCar.carModelId,
                    subcollections: [
                        {
                            collection: 'carVariant',
                            doc: selectedCar.carVariantId,
                        }
                    ]
                }
            ],
            storeAs: 'clickedCarVariant',
        },
        // Engine
        {
            collection: 'carBrand',
            doc: selectedCar.carBrandId,
            subcollections: [
                {
                    collection: 'carModel',
                    doc: selectedCar.carModelId,
                    subcollections: [
                        {
                            collection: 'carVariant',
                            doc: selectedCar.carVariantId,
                            subcollections: [
                                {
                                    collection: 'engine'
                                }
                            ]
                        }
                    ]
                }
            ],
            storeAs: 'engine',
        },
        // Performance
        {
            collection: 'carBrand',
            doc: selectedCar.carBrandId,
            subcollections: [
                {
                    collection: 'carModel',
                    doc: selectedCar.carModelId,
                    subcollections: [
                        {
                            collection: 'carVariant',
                            doc: selectedCar.carVariantId,
                            subcollections: [
                                {
                                    collection: 'performance'
                                }
                            ]
                        }
                    ]
                }
            ],
            storeAs: 'performance',
        },
        // Transmission
        {
            collection: 'carBrand',
            doc: selectedCar.carBrandId,
            subcollections: [
                {
                    collection: 'carModel',
                    doc: selectedCar.carModelId,
                    subcollections: [
                        {
                            collection: 'carVariant',
                            doc: selectedCar.carVariantId,
                            subcollections: [
                                {
                                    collection: 'transmission'
                                }
                            ]
                        }
                    ]
                }
            ],
            storeAs: 'transmission',
        },
    ])
    const photos = useSelector((state) => state.firestore.data.photos)
    const carVariantColors = useSelector((state) => state.firestore.data.colors)
    const clickedCarVariant = useSelector((state) => state.firestore.data.clickedCarVariant)
    const carVariantEngine = useSelector((state) => state.firestore.data.engine)
    const carVariantPerformance = useSelector((state) => state.firestore.data.performance)
    const carVariantTransmission = useSelector((state) => state.firestore.data.transmission)

    const navigateToInfosTab = () => {
        if (!carDetailsTabActive) {
            swiper.current.scrollBy(-1)
            setCarDetailsTabActive(true)
            setPhotosTabActive(false)
        }
    }

    const navigateToPhotosTab = () => {
        if (!photosTabActive) {
            swiper.current.scrollBy(1)
            setCarDetailsTabActive(false)
            setPhotosTabActive(true)
        }
    }

    const saveCar = () => {
        let carInfo = {
            carBrandId: selectedCar.carBrandId,
            carBrandName: selectedCar.carBrandName,
            carBrandUrl: selectedCar.carBrandUrl,
            carModelId: selectedCar.carModelId,
            carModelName: selectedCar.carModelName,
            carModelUrl: selectedCar.carModelUrl,
            bodyType: selectedCar.bodyType,
            carVariantId: selectedCar.carVariantId,
            carVariantName: selectedCar.carVariantName,
            price: selectedCar.price,
        }

        let clickInfo = {
            maleClick: clickedCarVariant.maleClick,
            femaleClick: clickedCarVariant.femaleClick,
            totalClick: clickedCarVariant.totalClick
        }
        // console.log(carInfo)
        // console.log(clickedCarVariant)
        addSavedCar(carInfo, clickInfo)
    }

    useEffect(() => {
        if(savedCars){
            setSavedCarList(savedCars)
        }
    }, [savedCars]);
    

    if(clickedCarVariant&&savedCarList){
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row',marginLeft: 20, marginTop: 10 }}>
                    {/* {clickedCarVariant ? (
                        <AntDesign style={{ color: colors.primary }} name="arrowleft" size={24} color="black" onPress={() => handleSetViewCarDetails(null, false, clickedCarVariant)} />
                    ) : null} */}
                    <AntDesign style={{ color: colors.primary }} name="arrowleft" size={24} color="black" onPress={() => handleSetViewCarDetails(null, false, null)} />
                    {home ? (
                        <Text style={{ marginTop: 3, marginLeft: 10, color: colors.primary }} onPress={() => handleSetViewCarDetails(null, false, null)}>Home</Text>
                    ) : explore ? (
                        <Text style={{ marginTop: 3, marginLeft: 10, color: colors.primary }} onPress={() => handleSetViewCarDetails(null, false, null)}>Explore</Text>
                    ) : (
                        <Text style={{ marginTop: 3, marginLeft: 10, color: colors.primary }} onPress={() => handleSetViewCarDetails(null, false)}>Saved Car List</Text>
                    )}
                </View>
                <View style={styles.cardContainer}>
                    <Image
                        style={{
                            width: 200,
                            height: 150,
                            resizeMode: 'contain',
                        }}
                        source={{ uri: selectedCar.carModelUrl}}
                    />
                    <Text style={{ color: colors.primary, fontSize: 24 }}>{selectedCar.carBrandName} {selectedCar.carModelName}</Text>
                    <Text style={{ marginVertical: 10 }}>{selectedCar.carVariantName}</Text>
                    <Text style={{ color: colors.placeholder, fontSize: 24 }}>{selectedCar.price}</Text>
                    {(home||explore)&&!savedCarList.find((element) => {return element.carVariantId === selectedCar.carVariantId}) ? (
                        <View style={{ marginTop: 15 }}>
                            <Button mode="contained" onPress={saveCar}>
                                Save
                            </Button>
                        </View>
                    ) : null}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Text style={{ fontSize: 16, color: carDetailsTabActive ? colors.primary : colors.text }} onPress={navigateToInfosTab}>Car Details</Text>
                    <Text style={{ fontSize: 16, color: photosTabActive ? colors.primary : colors.text }} onPress={navigateToPhotosTab}>Photos</Text>
                </View>
                <View style={{ flex: 9}}>
                    <Swiper
                        ref={swiper}
                        showsButtons={false}
                        showsPagination={false}
                        loop={false}
                    >
                        <View style={styles.slide}>
                            <ScrollView>
                                {carVariantColors ? (
                                    <InfoTable selectedCar={selectedCar} carVariantColors={carVariantColors}/>
                                ) : null}
                                {carVariantEngine ? (
                                    <EngineTable carVariantEngine={carVariantEngine}/>
                                ) : null}
                                {carVariantPerformance ? (
                                    <PerformanceTable carVariantPerformance={carVariantPerformance}/>
                                ) : null}
                                {carVariantTransmission ? (
                                    <TransmissionTable carVariantTransmission={carVariantTransmission}/>
                                ) : null}
                            </ScrollView>
                        </View>
                        <View style={styles.slide}>
                            <PhotoList photos={photos} />
                        </View>
                    </Swiper>
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
)(CarDetails)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
    },
    cardContainer: {
        flex: 13,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 40,
        marginVertical: 20,
        padding: 5,
        borderWidth: 0,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    },
    slide: {
        flex: 1,
        padding: 10,
        // justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    title: {
        color: '#5280E9',
        fontSize: 24,
    },
})
