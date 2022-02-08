import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchInterestedCarBrand, fetchInterestedCarType, fetchInterestedPriceRange } from '../actions/profile.action'
import RecommendedCarList from '../components/RecommendedCarList'
import Carousel from 'react-native-snap-carousel';
import { fetchRecommendedForYou, fetchRecommendedInput, fetchTopBrand, fetchTopCar, updateClick } from '../actions/recommendation.action'
import CarDetails from '../components/CarDetails'
import HomeRecommendedCarCard from '../components/cards/HomeRecommendedCarCard'

const HomeScreen = ({ auth, profile, interestedCarBrands, interestedCarTypes, interestedPriceRanges, fetchRecommendedInput, recommendedInput, updateClick, fetchTopCar, recommendedTopCar, fetchTopBrand, recommendedTopBrand, fetchRecommendedForYou, recommendedForYou }) => {

    const { colors } = useTheme();
    const [recommendedCar, setRecommendedCar] = useState(null);
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    const SLIDE_WIDTH = Math.round(viewportWidth / 2.25);
    const ITEM_HORIZONTAL_MARGIN = 15;
    const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 3.0;
    const SLIDER_WIDTH = viewportWidth;

    const carouselRef = useRef(null)

    const [viewCarDetails, setViewCarDetails] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const [currRecommendedForYou, setCurrRecommendedForYou] = useState(null);
    const [currRecommendedTopCar, setCurrRecommendedTopCar] = useState(null);
    const [currRecommendedTopBrand, setCurrRecommendedTopBrand] = useState(null);
    const [temp, setTemp] = useState([]);

    const handleSetViewCarDetails = (carInfo, viewCarDetails, clickedCarVariant) => {
        setViewCarDetails(viewCarDetails)
        setSelectedCar(carInfo)
    }

    const renderItem = ({ item }) => {
        return ( 
            <HomeRecommendedCarCard item={item} handleSetViewCarDetails={handleSetViewCarDetails} />
        )
    }

    const renderTopBrandItem = ({ item }) => {
        return ( 
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'white',
                borderRadius: 20,
                shadowOffset: { width: 10, height: 10 },
                shadowColor: 'black',
                shadowOpacity: 1,
                elevation: 3,
                height: 150,
                marginTop: 10,
                marginLeft: 10,
                marginRight: 10, }}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: item.carBrandUrl,
                    }}
                />
                <Text style={{color: colors.primary, fontSize: 18, fontWeight: 'bold'}}>{item.carBrandName}</Text>
            </View>
        )
    }

    useEffect(() => {
        fetchTopCar()
        fetchTopBrand()
        // fetchRecommendedForYou()
    }, []);

    useEffect(() => {
        // fetchTopCar();
        // fetchTopBrand();
        fetchRecommendedForYou()
    }, [interestedCarBrands, interestedCarTypes, interestedPriceRanges]);

    useEffect(() => {
        if(recommendedTopCar.length!=0){
            console.log("masuk")
            setCurrRecommendedTopCar(recommendedTopCar)
        }
    }, [recommendedTopCar]);

    useEffect(() => {
        if(recommendedTopBrand.length!=0){
            setCurrRecommendedTopBrand(recommendedTopBrand)
        }
    }, [recommendedTopBrand]);
    
    // useEffect(() => {
    //     if(interestedCarBrands&&interestedCarTypes&&interestedPriceRanges&&auth.uid!=null){
    //         let processedInterestedCarBrands = Object.entries(interestedCarBrands).map(key => ({ ...key[1] }));
    //         let processedinterestedCarTypes = Object.entries(interestedCarTypes).map(key => ({ ...key[1] }));
    //         fetchRecommendedInput(processedInterestedCarBrands[0].id, processedinterestedCarTypes[0].carTypeName, interestedPriceRanges.minPrice+"<"+interestedPriceRanges.maxPrice)
    //     }
    // }, [auth.uid])

    // useEffect(() => {
    //     if(recommendedInput!=null&&currRecommendedInput==null){
    //         setCurrRecommendedInput(recommendedInput)
    //     }
    // }, [recommendedInput])

    useEffect(() => {
        setTemp(recommendedForYou)
        if(recommendedForYou.length!=0&&temp.length!=0){
            setCurrRecommendedForYou(recommendedForYou)
        }
    }, [recommendedForYou]);

    // useEffect(() => {
    //     let processes;
    //     if(currRecommendedInput!=null&&interestedCarBrands&&interestedCarTypes&&interestedPriceRanges&&recommendedCar==null){
    //         const fetchData = async (currRecommendedInput) => {
    //             await fetch('http://192.168.100.17:5000/interest?carVariantName='+currRecommendedInput[0].carVariantName)
    //             .then(res => res.json())
    //             .then(data => {
    //                 processes = Object.entries(data).map(key => ({ ...key[1] }));
    //                 setRecommendedCar(processes)
    //             })
    //             .catch(error => {
    //                 console.log(error.message)
    //             })
    //         }
    //         fetchData(currRecommendedInput)
    //     }
    // }, [currRecommendedInput])

    // console.log(currRecommendedForYou)

    // console.log(recommendedTopCar)

    if(currRecommendedForYou!=null&&currRecommendedTopCar!=null&&currRecommendedTopBrand!=null) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {viewCarDetails === true ? (
                    <CarDetails auth={auth} selectedCar={selectedCar} handleSetViewCarDetails={handleSetViewCarDetails} home="home"/>
                ) : (
                    <View style={{ flex: 1, margin: 15 }}>
                        <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>Recommended For You</Text>
                        <Carousel
                            contentContainerCustomStyle={{overflow: 'hidden', width: ITEM_WIDTH * currRecommendedForYou.length + 20}}
                            layout={'default'}
                            ref={carouselRef}
                            data={currRecommendedForYou}
                            renderItem={renderItem}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            activeSlideAlignment={'start'}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}        
                        />
                        <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>Top Favorite Car</Text>
                        <Carousel
                            contentContainerCustomStyle={{overflow: 'hidden', width: ITEM_WIDTH * currRecommendedTopCar.length + 20}}
                            layout={'default'}
                            ref={carouselRef}
                            data={currRecommendedTopCar}
                            renderItem={renderItem}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            activeSlideAlignment={'start'}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}        
                        />
                        <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>Top Favorite Brand</Text>
                        <Carousel
                            contentContainerCustomStyle={{overflow: 'hidden', width: ITEM_WIDTH * currRecommendedTopBrand.length + 20}}
                            layout={'default'}
                            ref={carouselRef}
                            data={currRecommendedTopBrand}
                            renderItem={renderTopBrandItem}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            activeSlideAlignment={'start'}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}        
                        />
                    </View>
                )}
               
            </SafeAreaView>
        )
    } else {
        return (
            <View style={[styles.container, styles.horizontal]}>
                {/* <ActivityIndicator size="large" color="#0000ff"/> */}
                <Image 
                    source={require('C:/Users/DrPolymath/Documents/Programming/Carify/Backup/carify-user/assets/car_splash.gif')} 
                    style={{
                        width: 250,
                        alignSelf: 'center',
                        resizeMode: 'contain',
                    }}
                    />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        interestedCarBrands: state.firestore.data.interestedCarBrand,
        interestedCarTypes: state.firestore.data.interestedCarType,
        interestedPriceRanges: state.firestore.data.interestedPriceRange,
        recommendedInput: state.recommendation.recommendedInput,
        recommendedTopCar: state.recommendation.recommendedTopCar,
        recommendedTopBrand: state.recommendation.recommendedTopBrand,
        recommendedForYou: state.recommendation.recommendedForYou,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInterestedCarBrand: () => dispatch(fetchInterestedCarBrand()),
        fetchInterestedCarType: () => dispatch(fetchInterestedCarType()),
        fetchInterestedPriceRange: () => dispatch(fetchInterestedPriceRange()),
        fetchRecommendedInput: (carBrandId, bodyType, priceRange) => dispatch(fetchRecommendedInput(carBrandId, bodyType, priceRange)),
        updateClick: (carInfo) => dispatch(updateClick(carInfo)),
        fetchTopCar: () => dispatch(fetchTopCar()),
        fetchTopBrand: () => dispatch(fetchTopBrand()),
        fetchRecommendedForYou: () => dispatch(fetchRecommendedForYou()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})
