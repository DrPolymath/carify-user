import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import OutputCompareCard from './OutputCompareCard'
import Table from './Table'

const OutputCompareFirst = ({ carBrand, carModel, carVariant, handleClear }) => {

    useFirestoreConnect([
        {
            collection: 'carBrand',
            doc: carBrand,
            storeAs: 'selectedComparisonCarBrandFirst',
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
            storeAs: 'selectedComparisonCarModelFirst',
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
            storeAs: 'selectedComparisonCarVariantFirst',
        },
    ])

    const carBrandObject = useSelector((state) => state.firestore.data.selectedComparisonCarBrandFirst)
    const carModelObject = useSelector((state) => state.firestore.data.selectedComparisonCarModelFirst)
    const carVariantObject = useSelector((state) => state.firestore.data.selectedComparisonCarVariantFirst)

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

export default OutputCompareFirst

const styles = StyleSheet.create({})
