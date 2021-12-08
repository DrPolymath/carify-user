import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import CarDetails from '../components/CarDetails'
import SavedCarList from '../components/SavedCarList'

const SavedScreen = ({ auth }) => {
    
    const [viewCarDetails, setViewCarDetails] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const handleSetViewCarDetails = (carInfo, viewCarDetails) => {
        setViewCarDetails(viewCarDetails)
        setSelectedCar(carInfo)
    }

    if(auth.uid){
        return (
            <View style={styles.container}>
                
                {viewCarDetails === true ? (
                    <CarDetails selectedCar={selectedCar} handleSetViewCarDetails={handleSetViewCarDetails}/>
                ) : (
                    <SavedCarList auth={auth} handleSetViewCarDetails={handleSetViewCarDetails}/>
                )}
            </View>
        )
    } else {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(SavedScreen)

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})
