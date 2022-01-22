import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { firestoreConnect } from 'react-redux-firebase'
import SavedCarCard from './cards/SavedCarCard'
import { connect } from 'react-redux';
import { removeSavedCar } from '../actions/savedCar.action'
import { compose } from 'redux'


const SavedCarList = ({ savedCars, handleSetViewCarDetails }) => {

    return (
        <View style={styles.container}>
            {savedCars ? (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    horizontal={false}
                    data={savedCars}
                    renderItem={({item}) => (
                        <SavedCarCard carInfo={item} handleSetViewCarDetails={handleSetViewCarDetails}/>
                    )}
                />
            ) : null}
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        savedCars: state.firestore.ordered.savedCar,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeSavedCar: (carInfo) => dispatch(removeSavedCar(carInfo))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect( (props) => ([
        { 
            collection: 'users',
            doc: props.auth.uid,
            subcollections:[
                {
                    collection: 'savedCar',
                }
            ],
            storeAs:'savedCar'
        }
    ]))
)(SavedCarList)

const styles = StyleSheet.create({
    container:{
        marginTop: 10,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})
