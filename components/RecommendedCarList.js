import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { connect, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { fetchRecommendedCars } from '../actions/recommendation.action';

const RecommendedCarList = ({ interestedCarBrand, fetchRecommendedCars, recommendedCars }) => {

    const { colors } = useTheme();
    
    // useFirestoreConnect([
    //     {
    //         collection: 'carBrand',
    //         doc: interestedCarBrand.id,
    //         subcollections: [
    //             {
    //                 collection: 'carModel'
    //             }
    //         ],
    //         storeAs: 'carModel',
    //     },
    // ]) // sync todos collection from Firestore into redux


    // const carModels = useSelector((state) => state.firestore.data.carModel)

    useEffect(() => {
        if(interestedCarBrand.id){
            fetchRecommendedCars(interestedCarBrand.id);
            // console.log(recommendedCars)
        }
    }, [interestedCarBrand.id])

    // if(carModels){
    // const data = Object.keys(carModels).map(key => {
    //     return carModels[key];
    // })
    // console.log(data)
    // }
    return (
        <View key={interestedCarBrand.id}>
            <Text style={{ color: colors.primary, fontSize: 20 }}>{interestedCarBrand.carBrandName}</Text>
            {recommendedCars && recommendedCars.map((recommendedCar) => {
                return (
                    <Text key={recommendedCar.carModelName}>{recommendedCar.carModelName}</Text>
                )
            })}
        </View>
    )
}

const mapStateToProps = (state) => {
    return{
        recommendedCars : state.recommendation.recommendedCars,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecommendedCars: (carBrandID) => dispatch(fetchRecommendedCars(carBrandID)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedCarList)

const styles = StyleSheet.create({})
