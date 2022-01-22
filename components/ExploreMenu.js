import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addSavedCar } from '../actions/savedCar.action';
import { connect } from 'react-redux';

const ExploreMenu = ({ carInfo, addSavedCar }) => {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const saveCar = () => {
        // addSavedCar(carInfo)
        setVisible(false)
    };

    return (
        // <Provider>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<MaterialCommunityIcons name="dots-vertical" size={24} color="grey" onPress={openMenu} />}>
                    <Menu.Item onPress={saveCar} title="Save" />
                </Menu>
            </View>
        // </Provider>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        addSavedCar: (carInfo) => dispatch(addSavedCar(carInfo))
    }
}

export default connect(null, mapDispatchToProps)(ExploreMenu)

const styles = StyleSheet.create({})
