import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import Card from './Card';

const CarTypeList = (props) => {

    const { carTypes, selectedCT, handleSelectedCT } = props;

    return (
        <FlatList
            style={{flex: 1}}
            numColumns={3}
            horizontal={false}
            data={carTypes}
            renderItem={({item}) => (
                <Card
                    object={{ carTypeName: item.carTypeName, url: item.url, id: item.id }}
                    onPress={handleSelectedCT}
                    selectedObject={selectedCT}
                />
            )}
        />
    )
}

export default CarTypeList

const styles = StyleSheet.create({})