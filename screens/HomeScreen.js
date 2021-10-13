import React, { useEffect } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { connect } from 'react-redux'
import { fetchInterestedCarBrand, fetchInterestedCarType, fetchInterestedPriceRange } from '../actions/profile.action'
import RecommendedCarList from '../components/RecommendedCarList'

const HomeScreen = (props) => {

    const { auth, interestedCarBrands, interestedCarTypes, interestedPriceRanges } = props;

    useEffect(() => {
        // props.fetchInterestedCarBrand()
        // props.fetchInterestedCarType()
        // props.fetchInterestedPriceRange()
    }, [auth])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>I am home!</Text>
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
