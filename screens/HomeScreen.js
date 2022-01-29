import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchInterestedCarBrand, fetchInterestedCarType, fetchInterestedPriceRange } from '../actions/profile.action'
import RecommendedCarList from '../components/RecommendedCarList'
import Carousel from 'react-native-snap-carousel';
import { fetchRecommendedInput, updateClick } from '../actions/recommendation.action'
import CarDetails from '../components/CarDetails'
import HomeRecommendedCarCard from '../components/cards/HomeRecommendedCarCard'

const HomeScreen = ({ auth, profile, interestedCarBrands, interestedCarTypes, interestedPriceRanges, fetchRecommendedInput, recommendedInput, updateClick }) => {

    const { colors } = useTheme();
    const [recommendedCar, setRecommendedCar] = useState([]);
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    const SLIDE_WIDTH = Math.round(viewportWidth / 2.25);
    const ITEM_HORIZONTAL_MARGIN = 15;
    const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 3.0;
    const SLIDER_WIDTH = viewportWidth;

    const carouselRef = useRef(null)

    const [viewCarDetails, setViewCarDetails] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const handleSetViewCarDetails = (carInfo, viewCarDetails, clickedCarVariant) => {
        // if(viewCarDetails === true){
        //     // let clickedCar = {
        //     //     carBrandId: carInfo.carBrandId,
        //     //     carModelId: carInfo.carModelId,
        //     //     carVariantId: carInfo.carVariantId,
        //     //     carVariantName: carInfo.carVariantName,
        //     //     price: carInfo.price,
        //     //     maleClick: clickedCarVariant.maleClick,
        //     //     femaleClick: clickedCarVariant.femaleClick,
        //     //     totalClick: clickedCarVariant.totalClick
        //     // }
        //     // updateClick(clickedCar)
        //     // console.log(carInfo)
        //     // console.log(clickedCarVariant)
        // }
        setViewCarDetails(viewCarDetails)
        setSelectedCar(carInfo)
    }

    const renderItem = ({ item }) => {
        
        return ( 
            <HomeRecommendedCarCard item={item} handleSetViewCarDetails={handleSetViewCarDetails} />
        )
    }

    const TFC = [
        {
            name:"Kia Picanto",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FKiaPicanto.jpg?alt=media&token=f1ad3645-328b-4fab-9b0c-14113423c121",
        },
        {
            name:"Honda Jazz",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FHondaJazz.jpg?alt=media&token=481e2123-e675-494d-93c0-0c8f95ee8f89",
        },
        {
            name:"Honda Accord",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FHondaAccord.jpg?alt=media&token=30177330-93cf-4c41-9167-90918817dfe5",
        },
        {
            name:"Toyota Vios",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FToyotaVios.jpg?alt=media&token=77a52273-17ee-4d7b-99c3-d6d45134e72b",
        },
        {
            name:"Toyota Yaris",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FToyotaYaris.jpg?alt=media&token=fe9cac1b-f3dc-4f48-83d3-9ddbeb3c5e49",
        },
        
    ]

    const TFB = [
        {
            name:"Honda",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Fhonda.png?alt=media&token=302b0cf4-b48a-434e-abfc-d72d6615a20c",
        },
        {
            name:"Toyota",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Ftoyota.png?alt=media&token=31dbcafd-20f6-43c7-9636-fda9fbab40d5",
        },
        {
            name:"Nissan",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Fnissan.png?alt=media&token=7c9b389a-b057-42dd-80a3-169c418b6b10",
        },
        {
            name:"Kia",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Fkia.png?alt=media&token=78a5b19d-3ca7-4ca9-89f0-6975bafc9b5e",
        },
        {
            name:"Hyundai",
            carModelUrl: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Fhyundai.png?alt=media&token=a669ac3b-19cc-4f90-ba46-8426307beaba",
        },
    ]

    useEffect(() => {
        if(interestedCarBrands&&interestedCarTypes&&interestedPriceRanges&&auth.uid!=null){
            let processedInterestedCarBrands = Object.entries(interestedCarBrands).map(key => ({ ...key[1] }));
            let processedinterestedCarTypes = Object.entries(interestedCarTypes).map(key => ({ ...key[1] }));
            fetchRecommendedInput(processedInterestedCarBrands[0].id, processedinterestedCarTypes[0].carTypeName, interestedPriceRanges.minPrice+"<"+interestedPriceRanges.maxPrice)
        }
    }, [auth])

    useEffect(() => {
        let processes;
        if(recommendedInput!=null&&interestedCarBrands&&interestedCarTypes&&interestedPriceRanges){
            const fetchData = async (recommendedInput) => {
                await fetch('http://192.168.100.17:5000/interest?carVariantName='+recommendedInput[0].carVariantName)
                .then(res => res.json())
                .then(data => {
                    processes = Object.entries(data).map(key => ({ ...key[1] }));
                    setRecommendedCar(processes)
                })
                .catch(error => {
                    console.log(error.message)
                })
            }
            fetchData(recommendedInput)
        }
    }, [recommendedInput])

    if(recommendedCar.length!=0) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {viewCarDetails === true ? (
                    <CarDetails selectedCar={selectedCar} handleSetViewCarDetails={handleSetViewCarDetails} home="home"/>
                ) : (
                    <View style={{ flex: 1, margin: 15 }}>
                        <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>Recommended For You</Text>
                        {recommendedCar ? (
                            <Carousel
                                contentContainerCustomStyle={{overflow: 'hidden', width: ITEM_WIDTH * recommendedCar.length + 20}}
                                layout={'default'}
                                ref={carouselRef}
                                data={recommendedCar}
                                renderItem={renderItem}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={ITEM_WIDTH}
                                activeSlideAlignment={'start'}
                                inactiveSlideScale={1}
                                inactiveSlideOpacity={1}        
                            />
                        ) : null}
                        <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>Top Favorite Car</Text>
                        <Carousel
                            contentContainerCustomStyle={{overflow: 'hidden', width: ITEM_WIDTH * TFC.length + 20}}
                            layout={'default'}
                            ref={carouselRef}
                            data={TFC}
                            renderItem={renderItem}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            activeSlideAlignment={'start'}
                            inactiveSlideScale={1}
                            inactiveSlideOpacity={1}        
                        />
                        <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>Top Favorite Brand</Text>
                        <Carousel
                            contentContainerCustomStyle={{overflow: 'hidden', width: ITEM_WIDTH * TFB.length + 20}}
                            layout={'default'}
                            ref={carouselRef}
                            data={TFB}
                            renderItem={renderItem}
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
                <ActivityIndicator size="large" color="#0000ff"/>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInterestedCarBrand: () => dispatch(fetchInterestedCarBrand()),
        fetchInterestedCarType: () => dispatch(fetchInterestedCarType()),
        fetchInterestedPriceRange: () => dispatch(fetchInterestedPriceRange()),
        fetchRecommendedInput: (carBrandId, bodyType, priceRange) => dispatch(fetchRecommendedInput(carBrandId, bodyType, priceRange)),
        updateClick: (carInfo) => dispatch(updateClick(carInfo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
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
