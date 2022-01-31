import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, StatusBar, SafeAreaView, View, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import { Text, Button, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { signIn } from '../actions/auth.action';

const LoginScreen = (props) => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeText = text => setEmail(text);

    const emailHasErrors = () => {
        if(email !== '') {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        } else {
            return false;
        }
        
    };

    const passwordHasErrors = () => {
        if(password !== '') {
            return !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password);
        } else {
            return false;
        }
        
    };

    const signIn = () => {
        if (email == '' || password == '') {
            ToastAndroid.showWithGravity("Please enter the email and password to log in.", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if(emailHasErrors()) {
            ToastAndroid.showWithGravity("The email is not valid.", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else if (passwordHasErrors()) {
            ToastAndroid.showWithGravity("The password must al least has a minimum of eight characters, at least one letter, one number and one special character.", ToastAndroid.SHORT, ToastAndroid.CENTER);
        } else {
            let creds = {
                email: email,
                password: password,
            }
            props.signIn(creds)
        }
        
    }

    // useEffect(() => {
    //     if(props.authError === "There is no user record corresponding to this identifier. The user may have been deleted."){
    //         ToastAndroid.showWithGravity("The user do not exist.", ToastAndroid.SHORT, ToastAndroid.CENTER);
    //     } else if (props.authError === "The password is invalid or the user does not have a password.") {
    //         ToastAndroid.showWithGravity("The password is invalid.", ToastAndroid.SHORT, ToastAndroid.CENTER);
    //     }
    // }, [props.authError])

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    source={require(('../assets/logo.png'))}
                />
                <Text style={styles.subTitle}>Welcome back! Hope you are having {"\n"} a great day.</Text>
            </View>
            <View style={{ width: 250, }}>
                <TextInput
                    error={emailHasErrors()}
                    mode="outlined" 
                    label="Email"
                    value={email}
                    onChangeText={onChangeText}
                />
                <TextInput
                    error={passwordHasErrors()}
                    mode="outlined"
                    label="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Text style={styles.forgotPasswordLink}>Forgot your password?</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={signIn}>
                    Log in
                </Button>
            </View>
            <View style={styles.registerLinkContainer}>
                <Text style={{ color: "gray" }}>
                    Not a member yet? {''}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.registerLinkText}>JOIN</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginTop: StatusBar.currentHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        color: "gray",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 40,
    },
    forgotPasswordLink: {
        color: 'gray',
        textAlign: 'right',
        marginTop: 10
    },
    buttonContainer: {
        width: 200,
        margin: 30,
    },
    registerLinkContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
    },
    registerLinkText: {
        color: "gray",
        textDecorationLine: "underline",
    }
})
