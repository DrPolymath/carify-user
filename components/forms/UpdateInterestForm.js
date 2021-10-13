import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import MultiSelectBox from '../MultiSelectBox'

const UpdateInterestForm = ({ hideDialog }) => {

    useFirestoreConnect([
        {
            collection: 'carBrand'
        },
        {
            collection: 'carType'
        },
        {
            collection: 'priceRange'
        },
    ]) // sync todos collection from Firestore into redux

    const interestedCarBrands = useSelector((state) => state.firestore.data.interestedCarBrand)
    const interestedCarTypes = useSelector((state) => state.firestore.data.interestedCarType)
    const interestedPriceRanges = useSelector((state) => state.firestore.data.interestedPriceRange)
    const carBrands = useSelector((state) => state.firestore.data.carBrand)
    const carTypes = useSelector((state) => state.firestore.data.carType)
    const priceRanges = useSelector((state) => state.firestore.data.priceRange)

    return (
        <View style={{ margin: 10 }}>
            {carBrands && carTypes && priceRanges ? (
                <MultiSelectBox
                    hideDialog={hideDialog}
                    interestedCarBrands={interestedCarBrands}
                    interestedCarTypes={interestedCarTypes}
                    interestedPriceRanges={interestedPriceRanges}
                    carBrands={carBrands}
                    carTypes={carTypes}
                    priceRanges={priceRanges}
                />
            ) : null}
        </View>
    )
}

export default UpdateInterestForm

const styles = StyleSheet.create({})
