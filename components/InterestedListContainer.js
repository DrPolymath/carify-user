import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import InterestList from './InterestedList'

const InterestedListContainer = ({ auth }) => {

    useFirestoreConnect([
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [
                {
                    collection: 'interestedCarBrand'
                }
            ],
            storeAs: 'interestedCarBrand',
        },
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [
                {
                    collection: 'interestedCarType'
                }
            ],
            storeAs: 'interestedCarType',
        },
        {
            collection: 'users',
            doc: auth.uid,
            subcollections: [
                {
                    collection: 'interestedPriceRange'
                }
            ],
            storeAs: 'interestedPriceRange',
        },
    ]) // sync todos collection from Firestore into redux


    const interestedCarBrands = useSelector((state) => state.firestore.data.interestedCarBrand)
    const interestedCarTypes = useSelector((state) => state.firestore.data.interestedCarType)
    const interestedPriceRanges = useSelector((state) => state.firestore.data.interestedPriceRange)

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start'}}>
            {interestedCarBrands ? (
                <InterestList interestedCarBrands={interestedCarBrands}/>
            ) : (
                <View></View>
            )}
            {interestedCarTypes ? (
                <InterestList interestedCarTypes={interestedCarTypes}/>
            ) : (
                <View></View>
            )}
            {interestedPriceRanges ? (
                <InterestList interestedPriceRanges={interestedPriceRanges}/>
            ) : (
                <View></View>
            )}
        </View>
    )
}

export default InterestedListContainer

const styles = StyleSheet.create({})
