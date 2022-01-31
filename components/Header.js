import React from 'react'
import { Image, StatusBar, StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'

const Header = () => {
    return (
        <Appbar style={styles.upper}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                    style={{ width: 125, resizeMode: 'contain' }}
                    source={require('../assets/logo.png')}
                />
            </View>
            
        </Appbar>
    )
}

export default Header

const styles = StyleSheet.create({
    upper: {
        marginTop: StatusBar.currentHeight,
        marginHorizontal: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: 'white',
        elevation: 0.1,
      },
})
