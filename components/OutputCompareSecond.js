import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import OutputCompareCard from './OutputCompareCard'
import Table from './Table'

const OutputCompareSecond = ({ auth, carBrand, carModel, carVariant, handleClear }) => {

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
                            subcollections: [
                                {
                                    collection: 'colors',
                                }
                            ]
                        }
                    ]
                }
            ],
            storeAs: 'selectedCarVariantSecondColors',
        }
    ])

    const carBrandObject = useSelector((state) => state.firestore.data.selectedComparisonCarBrandSecond)
    const carModelObject = useSelector((state) => state.firestore.data.selectedComparisonCarModelSecond)
    const carVariantObject = useSelector((state) => state.firestore.data.selectedComparisonCarVariantSecond)
    const carVariantColors = useSelector((state) => state.firestore.data.selectedCarVariantSecondColors)

    return (
        <ScrollView>
            {carBrandObject && carModelObject && carVariantObject && auth.uid ? (
                <View style={{ marginHorizontal: 10 }}>
                    <OutputCompareCard 
                        auth={auth}
                        carBrandObject={carBrandObject} 
                        carModelObject={carModelObject} 
                        carVariantObject={carVariantObject} 
                        handleClear={handleClear}  
                        carVariant={carVariant}  
                    />
                    {carVariantColors ? (
                        <Table carBrandObject={carBrandObject} carModelObject={carModelObject} carVariantObject={carVariantObject} carVariantColors={carVariantColors}/>
                    ) : null}
                </View>
            ): null}
        </ScrollView>
        
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps, null)(OutputCompareSecond)

const styles = StyleSheet.create({})