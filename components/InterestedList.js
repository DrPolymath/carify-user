import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper';

const InterestList = (props) => {

    const { colors } = useTheme();

    const  { interestedCarBrands, interestedCarTypes, interestedPriceRanges } = props;

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>

            {!interestedCarBrands ? (
                (!interestedCarTypes ? (
                    <FlatList
                        style={{flex: 1}}
                        data={Object.entries(interestedPriceRanges).map(key => ({ ...key[1]}))}
                        horizontal={false}
                        numColumns={3}
                        renderItem={({item}) => (
                            <Text style={[styles.text, { backgroundColor: colors.accent }]}>{ "< " + item.maxPrice }</Text>
                        )}
                    />
                ) : (
                    <FlatList
                        style={{flex: 1}}
                        data={Object.entries(interestedCarTypes).map(key => ({ ...key[1]}))}
                        horizontal={false}
                        numColumns={3}
                        renderItem={({item}) => (
                            <Text style={[styles.text, { backgroundColor: colors.accent }]}>{ item.carTypeName }</Text>
                        )}
                    />
                ))
            ) : (
                <FlatList
                    style={{flex: 1}}
                    data={Object.entries(interestedCarBrands).map(key => ({ ...key[1]}))}
                    horizontal={false}
                    numColumns={3}
                    renderItem={({item}) => (
                        <Text style={[styles.text, { backgroundColor: colors.accent }]}>{ item.carBrandName }</Text>
                    )}
                />
            )}
        </View>
        
    )
}

export default InterestList

const styles = StyleSheet.create({
    text: {
        fontSize: 10,
        alignItems: 'center',
        padding: 4,
        marginRight: 5,
        borderWidth: 0,
        borderRadius: 10,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 1,
    }
})
