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

const OutputCompareThird = ({ auth, carBrand, carModel, carVariant, handleClear }) => {

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
            storeAs: 'selectedCarVariantThirdColors',
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
            storeAs: 'engineThird',
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
            storeAs: 'performanceThird',
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
            storeAs: 'transmissionThird',
        },
    ])

    const carBrandObject = useSelector((state) => state.firestore.data.selectedComparisonCarBrandThird)
    const carModelObject = useSelector((state) => state.firestore.data.selectedComparisonCarModelThird)
    const carVariantObject = useSelector((state) => state.firestore.data.selectedComparisonCarVariantThird)
    const carVariantColors = useSelector((state) => state.firestore.data.selectedCarVariantThirdColors)
    const carVariantEngine = useSelector((state) => state.firestore.data.engineThird)
    const carVariantPerformance = useSelector((state) => state.firestore.data.performanceThird)
    const carVariantTransmission = useSelector((state) => state.firestore.data.transmissionThird)

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

export default connect(mapStateToProps, null)(OutputCompareThird)

const styles = StyleSheet.create({})