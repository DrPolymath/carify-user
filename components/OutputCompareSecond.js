import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { connect, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import EstimationModal from './EstimationModal'
import OutputCompareCard from './OutputCompareCard'
import Table from './Table'
import EngineTable from './tables/EngineTable'
import PerformanceTable from './tables/PerformanceTable'
import TransmissionTable from './tables/TransmissionTable'

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
        },
        // Engine
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
                                    collection: 'engine',
                                }
                            ]
                        }
                    ]
                }
            ],
            storeAs: 'engineSecond',
        },
        // Performance
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
                                    collection: 'performance',
                                }
                            ]
                        }
                    ]
                }
            ],
            storeAs: 'performanceSecond',
        },
        // Transmission
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
                                    collection: 'transmission',
                                }
                            ]
                        }
                    ]
                }
            ],
            storeAs: 'transmissionSecond',
        },
    ])

    const carBrandObject = useSelector((state) => state.firestore.data.selectedComparisonCarBrandSecond)
    const carModelObject = useSelector((state) => state.firestore.data.selectedComparisonCarModelSecond)
    const carVariantObject = useSelector((state) => state.firestore.data.selectedComparisonCarVariantSecond)
    const carVariantColors = useSelector((state) => state.firestore.data.selectedCarVariantSecondColors)
    const carVariantEngine = useSelector((state) => state.firestore.data.engineSecond)
    const carVariantPerformance = useSelector((state) => state.firestore.data.performanceSecond)
    const carVariantTransmission = useSelector((state) => state.firestore.data.transmissionSecond)

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
                    {carVariantEngine ? (
                        <EngineTable carVariantEngine={carVariantEngine}/>
                    ) : null}
                    {carVariantPerformance ? (
                        <PerformanceTable carVariantPerformance={carVariantPerformance}/>
                    ) : null}
                    {carVariantTransmission ? (
                        <TransmissionTable carVariantTransmission={carVariantTransmission}/>
                    ) : null}
                    {carVariantColors ? (
                        <EstimationModal carVariantObject={carVariantObject} />
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