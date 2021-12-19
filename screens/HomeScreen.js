import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchInterestedCarBrand, fetchInterestedCarType, fetchInterestedPriceRange } from '../actions/profile.action'
import RecommendedCarList from '../components/RecommendedCarList'
import Carousel from 'react-native-snap-carousel';

const HomeScreen = (props) => {

    const { colors } = useTheme();
    const { auth, interestedCarBrands, interestedCarTypes, interestedPriceRanges } = props;
    const [currentTime, setCurrentTime] = useState(0);
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
                        uri: item.url,
                    }}
                />
                <Text style={{color: colors.primary, fontSize: 16}}>{item.name}</Text>
            </View>
        )
    }

    const RFY = [
        {
            name:"Kia Cerato",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FKiaCerato.jpg?alt=media&token=71f53bc0-5f94-4178-8b4d-63b617cc858d",
        },
        {
            name:"Kia Seltos",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FKiaSeltos.jpg?alt=media&token=3eba3d88-92f8-40f5-b840-d67d3e703a1d",
        },
        {
            name:"Hyundai Sonata",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FHyundaiSonata.jpg?alt=media&token=f48432f8-c2a5-44f3-8459-60163fb4987d",
        },
        {
            name:"Honda Civic",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FHondaCivic.jpg?alt=media&token=81728357-33d9-40c7-9e7e-dd536b4b44d7",
        },
        {
            name:"Honda Accord",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FHondaAccord.jpg?alt=media&token=30177330-93cf-4c41-9167-90918817dfe5",
        },
    ]

    const TFC = [
        {
            name:"Kia Picanto",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FKiaPicanto.jpg?alt=media&token=f1ad3645-328b-4fab-9b0c-14113423c121",
        },
        {
            name:"Honda Jazz",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FHondaJazz.jpg?alt=media&token=481e2123-e675-494d-93c0-0c8f95ee8f89",
        },
        {
            name:"Honda Accord",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FHondaAccord.jpg?alt=media&token=30177330-93cf-4c41-9167-90918817dfe5",
        },
        {
            name:"Toyota Vios",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FToyotaVios.jpg?alt=media&token=77a52273-17ee-4d7b-99c3-d6d45134e72b",
        },
        {
            name:"Toyota Yaris",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FmodelLogo%2FToyotaYaris.jpg?alt=media&token=fe9cac1b-f3dc-4f48-83d3-9ddbeb3c5e49",
        },
        
    ]

    const TFB = [
        {
            name:"Honda",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Fhonda.png?alt=media&token=302b0cf4-b48a-434e-abfc-d72d6615a20c",
        },
        {
            name:"Toyota",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Ftoyota.png?alt=media&token=31dbcafd-20f6-43c7-9636-fda9fbab40d5",
        },
        {
            name:"Nissan",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Fnissan.png?alt=media&token=7c9b389a-b057-42dd-80a3-169c418b6b10",
        },
        {
            name:"Kia",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Fkia.png?alt=media&token=78a5b19d-3ca7-4ca9-89f0-6975bafc9b5e",
        },
        {
            name:"Hyundai",
            url: "https://firebasestorage.googleapis.com/v0/b/carify-c094d.appspot.com/o/images%2FbrandLogo%2Fhyundai.png?alt=media&token=a669ac3b-19cc-4f90-ba46-8426307beaba",
        },
    ]

    

    useEffect(() => {
        // fetch('http://192.168.100.9:5000/time').then(res => res.json()).then(data => {
        //     setCurrentTime(data.time);
        // });
        // props.fetchInterestedCarBrand()
        // props.fetchInterestedCarType()
        // props.fetchInterestedPriceRange()
    }, [auth])

    return (
        <SafeAreaView style={{ flex: 1, margin: 15 }}>
            <Text style={{ color: colors.primary, fontSize: 20, fontWeight: 'bold' }}>Recommended For You</Text>
            <Carousel
                contentContainerCustomStyle={{overflow: 'hidden', width: ITEM_WIDTH * RFY.length + 20}}
                layout={'default'}
                ref={carouselRef}
                data={RFY}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                activeSlideAlignment={'start'}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}        
            />
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
        interestedCarBrands: state.profile.interestedCarBrands,
        interestedCarTypes: state.profile.interestedCarTypes,
        interestedPriceRanges: state.profile.interestedPriceRanges,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchInterestedCarBrand: () => dispatch(fetchInterestedCarBrand()),
        fetchInterestedCarType: () => dispatch(fetchInterestedCarType()),
        fetchInterestedPriceRange: () => dispatch(fetchInterestedPriceRange()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({})
