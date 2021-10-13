import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import Card from './Card';

const CarBrandList = (props) => {

    const { carBrands, selectedCB, handleSelectedCB } = props;

    return (
        <FlatList
            style={{flex: 1}}
            numColumns={3}
            horizontal={false}
            data={carBrands}
            renderItem={({item}) => (
                <Card
                    object={{carBrandName: item.carBrandName, url: item.url, id: item.id}}
                    onPress={handleSelectedCB}
                    selectedObject={selectedCB}
                />
            )}
        />
    )
}

export default CarBrandList

const styles = StyleSheet.create({})
