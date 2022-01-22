import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ImageSliderBox from '../components/ImageSliderBox';
import ExploreMenu from '../components/ExploreMenu';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ExploreScreen = ({ carVariants, carPhotos }) => {

    const { colors } = useTheme();
    const [recommendedCar, setRecommendedCar] = useState([]);

    const renderSliderBox = (processedCarPhotos, carModelId) => {
        let obj = processedCarPhotos.filter(o => o.cmId === carModelId);
        return (
            <ImageSliderBox carPhotos={obj} />
        )
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        let processes;
        if(carVariants){
            let processedcarVariants = Object.entries(carVariants).map(key => ({ ...key[1] }));
            let randomVariant = processedcarVariants[Math.floor(Math.random() * (processedcarVariants.length-1))].carVariantName
            const fetchData = async () => {
                await fetch('http://192.168.100.17:5000/random?carVariantName='+randomVariant)
                .then(res => res.json())
                .then(data => {
                    processes = Object.entries(data).map(key => ({ ...key[1] }));
                    setRecommendedCar(processes)
                })
                .catch(error => {
                    console.log(error.message)
                })
            }
            fetchData()
        }
    }, [carVariants, refreshing])

    if(carPhotos){

        const processedCarPhotos = Object.entries(carPhotos).map(key => ({ ...key[1] }));

        if(processedCarPhotos){
            return(
                <SafeAreaView style={{ flex: 1, margin: 15 }}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        style={{flex: 1}}
                        showsVerticalScrollIndicator={false}
                        horizontal={false}
                        data={recommendedCar}
                        refreshControl={<RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />}
                        renderItem={({item}) => (
                            <View style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <View style={{ flex: 3 }}>
                                        <Image
                                            style={{
                                                width: 50,
                                                height: 50,
                                                resizeMode: 'contain'
                                            }}
                                            source={{
                                                uri: item.carModelUrl,
                                            }} 
                                        />
                                    </View>
                                    <View style={{ flex: 12 }}>
                                        <Text style={{ color: colors.primary, fontSize: 20}}>{item.carBrandName} {item.carModelName}</Text>
                                        <Text style={{ fontSize: 10}}>{item.carVariantName}</Text>
                                    </View>
                                    {/* <View style={{ flex: 1 }}>
                                        <ExploreMenu carInfo={item}/>
                                    </View> */}
                                </View>
                                {processedCarPhotos ? renderSliderBox(processedCarPhotos, item.carModelId) : null}
                            </View>
                        )}
                    />
                </SafeAreaView>
            )
        } else {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            )
        }
    } else {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carVariants: state.firestore.data.carVariant,
        carPhotos: state.firestore.data.carPhotos,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {
            collectionGroup: 'carVariant',
            storeAs: 'carVariant'
        },
        {
            collectionGroup: 'photos',
            storeAs: 'carPhotos'
        }
    ])
)(ExploreScreen)

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        margin: 10,
        padding: 15,
        borderWidth: 0,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 32,
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})
