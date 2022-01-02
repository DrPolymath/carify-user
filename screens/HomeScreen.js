import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchInterestedCarBrand, fetchInterestedCarType, fetchInterestedPriceRange } from '../actions/profile.action'
import RecommendedCarList from '../components/RecommendedCarList'
import Carousel from 'react-native-snap-carousel';
import { fetchRecommendedInput } from '../actions/recommendation.action'

const HomeScreen = (props) => {

    const { colors } = useTheme();
    const { auth, interestedCarBrands, interestedCarTypes, interestedPriceRanges, fetchRecommendedInput, recommendedInput } = props;
    const [recommendedCar, setRecommendedCar] = useState([]);
    const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
    const SLIDE_WIDTH = Math.round(viewportWidth / 3.0);
    const ITEM_HORIZONTAL_MARGIN = 15;
    const ITEM_WIDTH = SLIDE_WIDTH + ITEM_HORIZONTAL_MARGIN * 0.5;
    const SLIDER_WIDTH = viewportWidth;

    const carouselRef = useRef(null)

    const renderItem = ({ item }) => {
        
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
                        uri: item.carModelUrl,
                    }}
                />
                <Text style={{color: colors.primary, fontSize: 16}}>{item.carBrandName} {item.carModelName}</Text>
            </View>
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
        let processes;
        if(interestedCarBrands&&interestedCarTypes&&interestedPriceRanges){
            // console.log(interestedCarBrands)
            let processedInterestedCarBrands = Object.entries(interestedCarBrands).map(key => ({ ...key[1] }));
            let processedinterestedCarTypes = Object.entries(interestedCarTypes).map(key => ({ ...key[1] }));
            // console.log(processedInterestedCarBrands[0].id)
            // fetchMyAPI()
            // setRecommendedCar(processes)
            fetchRecommendedInput(processedInterestedCarBrands[0].id, processedinterestedCarTypes[0].carTypeName, interestedPriceRanges.minPrice+"<"+interestedPriceRanges.maxPrice)
            // console.log(interestedCarBrands)
        }
        // props.fetchInterestedCarBrand()
        // props.fetchInterestedCarType()
        // props.fetchInterestedPriceRange()
    }, [auth])

    // console.log(recommendedCar)

    useEffect(() => {
        let processes;
        if(recommendedInput&&interestedCarBrands&&interestedCarTypes&&interestedPriceRanges){
            // console.log(recommendedInput[0].carVariantName)
            fetch('http://192.168.100.17:5000/interest?carVariantName='+recommendedInput[0].carVariantName).then(res => res.json()).then(data => {
                // setCurrentTime(data.time);
                // console.log(data);
                processes = Object.entries(data).map(key => ({ ...key[1] }));
                setRecommendedCar(processes)
            });
            // async function fetchMyAPI() {
            //     let response = await fetch('http://192.168.100.17:5000/interest?carVariantName='+recommendedInput[0].carVariantName)
            //     response = await response.json()
            //     processes = Object.entries(response).map(key => ({ ...key[1] }));
            //     console.log("separate")
            //     setRecommendedCar(processes)
            // }
            // fetchMyAPI()
        }
    }, [recommendedInput])

    return (
        <SafeAreaView style={{ flex: 1, margin: 15 }}>
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
            {/* {interestedCarBrands && interestedCarBrands.map(interestedCarBrand => {
                return (
                    <RecommendedCarList key={interestedCarBrand.id} interestedCarBrand={interestedCarBrand} />
                )
            })} */}
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({})
