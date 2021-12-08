import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'

const PhotoList = ({ photos }) => {

    console.log(photos)

    return (
        <View style={styles.container}>
            {photos ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    horizontal={false}
                    data={Object.entries(photos).map(key => ({ ...key[1], id:key[0] }))}
                    renderItem={({item}) => (
                        <Image
                            style={{
                                width: 150,
                                height: 100,
                                resizeMode: 'contain',
                                borderRadius: 20,
                                marginHorizontal: 5,
                            }}
                            source={{ uri: item.carPhoto }}
                        />
                    )}
                />
            ) : null}
        </View>
    )
}

export default PhotoList

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})

