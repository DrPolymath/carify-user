import React, { useEffect, useLayoutEffect } from 'react'
import { StyleSheet, StatusBar, SafeAreaView, Image, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper';
import { Button } from 'react-native-paper'
import { connect } from 'react-redux';

const LandingScreen = (props) => {

    const navigation = props.navigation;
    const { colors } = useTheme();
    const auth = props.auth;

    useEffect(() => {
        if (auth.createdAt === auth.lastLoginAt && !auth.isEmpty) {
            navigation.replace("Interest")
        } else if (!auth.isEmpty) {
            navigation.replace("Main")
        }
    }, [auth])

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    source={require(('../assets/logo.png'))}
                />
                <Text style={styles.subTitle}>Discover your unknown preferences</Text>
            </View>
            <Image
                style={styles.landingPicture}
                source={require(('../assets/landingPicture.png'))}
            />
            <View style={styles.buttonContainer}>
                <Button raised mode="contained" onPress={() => navigation.navigate("Login")}>
                    LOGIN
                </Button>
            </View>
            <View style={styles.buttonContainer}>
                <Button raised mode="contained" color={colors.accent} onPress={() => navigation.navigate("SignUp")}>
                    JOIN
                </Button>
            </View>
            
        </SafeAreaView>
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(LandingScreen)

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        color: "gray",
        textAlign: "center",
        marginTop: 10,
    },
    landingPicture: {
        marginTop: 75,
        marginBottom: 75,
    },
    buttonContainer: {
        width: 300,
        marginTop: 10 
    },
})
