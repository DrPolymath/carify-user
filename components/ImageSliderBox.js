import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";

const ImageSliderBox = ({ carPhotos }) => {

    return (
        <View>
            <SliderBox 
                images={carPhotos.map(item => {
                            return item.carPhoto
                        })}
                parentWidth={330}
                ImageComponentStyle={{ borderRadius: 15, marginTop: 5 }}
            />
        </View>
    )
}

export default ImageSliderBox

const styles = StyleSheet.create({})
