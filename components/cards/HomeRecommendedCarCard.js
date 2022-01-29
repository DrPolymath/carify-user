import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const HomeRecommendedCarCard = ({ item, handleSetViewCarDetails, clickedCarVariant}) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'white',
            borderRadius: 20,
            shadowOffset: { width: 10, height: 10 },
            shadowColor: 'black',
            shadowOpacity: 1,
            elevation: 3,
            height: 150,
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10, }}
            onPress={() => handleSetViewCarDetails(item, true, null)}>
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'contain'
                }}
                source={{
                    uri: item.carModelUrl,
                }}
            />
            <Text style={{color: colors.primary, fontSize: 18, fontWeight: 'bold'}}>{item.carBrandName} {item.carModelName}</Text>
            <Text style={{  fontSize: 12 }}>{item.carVariantName}</Text>
        </TouchableOpacity>
    );

    // if(clickCarVariantCurr){
        
    // } else {
    //     return (
    //         <View>
                
    //         </View>
    //     )
    // }
    
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
)(HomeRecommendedCarCard)

const styles = StyleSheet.create({});
