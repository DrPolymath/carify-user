import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import OutputCompareCard from './OutputCompareCard'
import Table from './Table'

const OutputCompareThird = ({ carBrand, carModel, carVariant, handleClear }) => {

    useFirestoreConnect([
        {
            collection: 'carBrand',
            doc: carBrand,
            storeAs: 'selectedComparisonCarBrandThird',
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
            storeAs: 'selectedComparisonCarModelThird',
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
            storeAs: 'selectedComparisonCarVariantThird',
        },
    ])

    const carBrandObject = useSelector((state) => state.firestore.data.selectedComparisonCarBrandThird)
    const carModelObject = useSelector((state) => state.firestore.data.selectedComparisonCarModelThird)
    const carVariantObject = useSelector((state) => state.firestore.data.selectedComparisonCarVariantThird)

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

export default OutputCompareThird

const styles = StyleSheet.create({})