import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import OutputCompareCard from './OutputCompareCard'
import Table from './Table'

const OutputCompareSecond = ({ carBrand, carModel, carVariant, handleClear }) => {

    useFirestoreConnect([
        {
            collection: 'carBrand',
            doc: carBrand,
            storeAs: 'selectedComparisonCarBrandSecond',
        },
        {
            collection: 'carBrand',
            doc: carBrand,
            subcollections: [
                {
                    collection: 'carModel',
                    doc: carModel,
                }
            ],
            storeAs: 'selectedComparisonCarModelSecond',
        },
        {
            collection: 'carBrand',
            doc: carBrand,
            subcollections: [
                {
                    collection: 'carModel',
                    doc: carModel,
                    subcollections: [
                        {
                            collection: 'carVariant',
                            doc: carVariant,
                        }
                    ]
                }
            ],
            storeAs: 'selectedComparisonCarVariantSecond',
        },
    ])

    const carBrandObject = useSelector((state) => state.firestore.data.selectedComparisonCarBrandSecond)
    const carModelObject = useSelector((state) => state.firestore.data.selectedComparisonCarModelSecond)
    const carVariantObject = useSelector((state) => state.firestore.data.selectedComparisonCarVariantSecond)

    return (
        <ScrollView>
            {carBrandObject && carModelObject && carVariantObject ? (
                <View>
                    <OutputCompareCard 
                        carBrandObject={carBrandObject} 
                        carModelObject={carModelObject} 
                        carVariantObject={carVariantObject} 
                        handleClear={handleClear}  
                        carVariant={carVariant}  
                    />
                    <Table carBrandObject={carBrandObject} carModelObject={carModelObject} carVariantObject={carVariantObject}/>
                </View>
            ): null}
        </ScrollView>
        
    )
}

export default OutputCompareSecond

const styles = StyleSheet.create({})