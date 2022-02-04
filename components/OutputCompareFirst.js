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

const OutputCompareFirst = ({ auth, carBrand, carModel, carVariant, handleClear }) => {

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
            storeAs: 'selectedCarVariantFirstColors',
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
            storeAs: 'engineFirst',
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
            storeAs: 'performanceFirst',
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
            storeAs: 'transmissionFirst',
        },
    ])

    const carBrandObject = useSelector((state) => state.firestore.data.selectedComparisonCarBrandFirst)
    const carModelObject = useSelector((state) => state.firestore.data.selectedComparisonCarModelFirst)
    const carVariantObject = useSelector((state) => state.firestore.data.selectedComparisonCarVariantFirst)
    const carVariantColors = useSelector((state) => state.firestore.data.selectedCarVariantFirstColors)
    const carVariantEngine = useSelector((state) => state.firestore.data.engineFirst)
    const carVariantPerformance = useSelector((state) => state.firestore.data.performanceFirst)
    const carVariantTransmission = useSelector((state) => state.firestore.data.transmissionFirst)

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

export default connect(mapStateToProps, null)(OutputCompareFirst)

const styles = StyleSheet.create({})
