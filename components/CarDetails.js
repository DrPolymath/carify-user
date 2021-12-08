import React, { useRef, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import Swiper from 'react-native-swiper'
import InfoTable from './InfoTable';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import PhotoList from './PhotoList';

const CarDetails = ({ selectedCar, handleSetViewCarDetails }) => {
    const { colors } = useTheme();
    const swiper = useRef(null);
    const [carDetailsTabActive, setCarDetailsTabActive] = useState(true);
    const [photosTabActive, setPhotosTabActive] = useState(false);

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
    ])
    const photos = useSelector((state) => state.firestore.data.photos)

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

    return (
        <View style={styles.container}>
            <AntDesign style={{ flex: 1}} name="arrowleft" size={24} color="black" onPress={() => handleSetViewCarDetails(null, false)} />
            <View style={styles.cardContainer}>
                <Image
                    style={{
                        width: 200,
                        height: 150,
                        resizeMode: 'contain',
                    }}
                    source={{ uri: selectedCar.carModelImgUrl}}
                />
                <Text style={{ color: colors.primary, fontSize: 24 }}>{selectedCar.carBrandName} {selectedCar.carModelName}</Text>
                <Text style={{ marginVertical: 10 }}>{selectedCar.carVariantName}</Text>
                <Text style={{ color: colors.placeholder, fontSize: 24 }}>{selectedCar.price}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 16, color: carDetailsTabActive ? colors.primary : colors.text }} onPress={navigateToInfosTab} >Car Details</Text>
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
                            <InfoTable selectedCar={selectedCar} />
                        </ScrollView>
                    </View>
                    <View style={styles.slide}>
                        <PhotoList photos={photos} />
                    </View>
                </Swiper>
            </View>
        </View>
    )
}

export default CarDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
    },
    cardContainer: {
        flex: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 40,
        marginVertical: 20,
        padding: 10,
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
