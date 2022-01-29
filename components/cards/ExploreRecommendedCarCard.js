import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ImageSliderBox from '../ImageSliderBox';
import { useTheme } from 'react-native-paper';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

const ExploreRecommendedCarCard = ({ item, processedCarPhotos, handleSetViewCarDetails, clickedCarVariant }) => {

    const { colors } = useTheme();
    const renderSliderBox = (processedCarPhotos, carModelId) => {
        let obj = processedCarPhotos.filter(o => o.cmId === carModelId);
        return (
            <ImageSliderBox carPhotos={obj} />
        )
    }

    return (
        <TouchableOpacity style={styles.card} onPress={() => handleSetViewCarDetails(item, true, null)}>
            <View style={styles.cardHeader}>
                <View style={{ flex: 3 }}>
                    <Image
                        style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'contain'
                        }}
                        source={{
                            uri: item.carModelUrl,
                        }} 
                    />
                </View>
                <View style={{ flex: 12 }}>
                    <Text style={{ color: colors.primary, fontSize: 20}}>{item.carBrandName} {item.carModelName}</Text>
                    <Text style={{ fontSize: 10}}>{item.carVariantName}</Text>
                </View>
                {/* <View style={{ flex: 1 }}>
                    <ExploreMenu carInfo={item}/>
                </View> */}
            </View>
            {processedCarPhotos ? renderSliderBox(processedCarPhotos, item.carModelId) : null}
        </TouchableOpacity>
    );
};

const mapStateToProps = (state) => {
    return {
        clickedCarVariant: state.firestore.data.clickedCarVariant,
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect( (props) => ([
        { 
            collection: 'carBrand',
            doc: props.item.carBrandId,
            subcollections: [
                {
                    collection: 'carModel',
                    doc: props.item.carModelId,
                    subcollections: [
                        {
                            collection: 'carVariant',
                            doc: props.item.carVariantId,
                        }
                    ]
                }
            ],
            storeAs: 'clickedCarVariant',
        }
    ]))
)(ExploreRecommendedCarCard)

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        margin: 10,
        padding: 15,
        borderWidth: 0,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3,
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});
