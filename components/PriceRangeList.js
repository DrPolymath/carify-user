import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import Card from './Card';

const PriceRangeList = (props) => {

    const { priceRanges, selectedPR, handleSelectedPR } = props;

    return (
        <FlatList
            style={{flex: 1}}
            numColumns={3}
            horizontal={false}
            data={priceRanges}
            renderItem={({item}) => (
                <Card
                    object={{maxPrice: item.maxPrice, minPrice: item.minPrice, id: item.id}}
                    onPress={handleSelectedPR}
                    selectedObject={selectedPR}
                />
            )}
        />
    )
}

export default PriceRangeList

const styles = StyleSheet.create({})
