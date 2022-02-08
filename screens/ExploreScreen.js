import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import ExploreMenu from '../components/ExploreMenu';
import ExploreRecommendedCarCard from '../components/cards/ExploreRecommendedCarCard';
import CarDetails from '../components/CarDetails';
import { fetchRandomCar } from '../actions/recommendation.action';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ExploreScreen = ({auth, carVariants, carPhotos, fetchRandomCar, recommendedRandomCar }) => {

    const [recommendedCar, setRecommendedCar] = useState([]);

    const [refreshing, setRefreshing] = React.useState(false);

    const [viewCarDetails, setViewCarDetails] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const [fetchCarVariants, setFetchCarVariants] = useState(null);
    const [currRecommendedRandomCar, setCurrRecommendedRandomCar] = useState(null);

    const handleSetViewCarDetails = (carInfo, viewCarDetails, clickedCarVariant) => {
        // if(viewCarDetails === false){
        //     let clickedCar = {
        //         carBrandId: selectedCar.carBrandId,
        //         carModelId: selectedCar.carModelId,
        //         carVariantId: selectedCar.carVariantId,
        //         carVariantName: selectedCar.carVariantName,
        //         price: selectedCar.price,
        //         maleClick: clickedCarVariant.maleClick,
        //         femaleClick: clickedCarVariant.femaleClick,
        //         totalClick: clickedCarVariant.totalClick
        //     }
        //     updateClick(clickedCar)
        // }
        setViewCarDetails(viewCarDetails)
        setSelectedCar(carInfo)
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchRandomCar()
        wait(2250).then(() => setRefreshing(false));
    }, []);

    // useEffect(() => {
    //     let processes;
    //     if(fetchCarVariants){
    //         let processedcarVariants = Object.entries(carVariants).map(key => ({ ...key[1] }));
    //         let randomVariant = processedcarVariants[Math.floor(Math.random() * (processedcarVariants.length-1))].carVariantName
    //         const fetchData = async () => {
    //             await fetch('http://192.168.100.17:5000/random?carVariantName='+randomVariant)
    //             .then(res => res.json())
    //             .then(data => {
    //                 processes = Object.entries(data).map(key => ({ ...key[1] }));
    //                 setRecommendedCar(processes)
    //             })
    //             .catch(error => {
    //                 console.log(error.message)
    //             })
    //         }
    //         fetchData()
    //     }
    // }, [fetchCarVariants])

    useEffect(() => {
        if(carVariants!=null&&fetchCarVariants==null){
            setFetchCarVariants(carVariants)
        }
    }, [carVariants]);

    useEffect(() => {
      fetchRandomCar();
    }, []);
    
    useEffect(() => {
        if(recommendedRandomCar.length!=0){
            setCurrRecommendedRandomCar(recommendedRandomCar)
        }
      }, [recommendedRandomCar]);

    if(carPhotos&&currRecommendedRandomCar!=null){

        const processedCarPhotos = Object.entries(carPhotos).map(key => ({ ...key[1] }));

        if(processedCarPhotos){
            return(
                <SafeAreaView style={{ flex: 1, margin: 15 }}>
                    {viewCarDetails === true ? (
                        <CarDetails auth={auth} selectedCar={selectedCar} handleSetViewCarDetails={handleSetViewCarDetails} explore="explore" />
                    ) : (
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            style={{flex: 1}}
                            showsVerticalScrollIndicator={false}
                            horizontal={false}
                            data={currRecommendedRandomCar}
                            refreshControl={<RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />}
                            renderItem={({item}) => (
                                <ExploreRecommendedCarCard item={item} processedCarPhotos={processedCarPhotos} handleSetViewCarDetails={handleSetViewCarDetails}/>
                            )}
                        />
                    )}
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
        auth: state.firebase.auth,
        carVariants: state.firestore.data.carVariant,
        carPhotos: state.firestore.data.carPhotos,
        recommendedRandomCar: state.recommendation.recommendedRandomCar,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchRandomCar: () => dispatch(fetchRandomCar()),
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
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
