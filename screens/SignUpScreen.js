import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView, Text, StatusBar, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { signUp } from '../actions/auth.action';
import { connect } from 'react-redux';

const SignUpScreen = (props) => {
    const navigation = useNavigation();
    const [showDropDown, setShowDropDown] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');

    const genderList = [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
    ];

    const usernameHasErrors = () => {
        // Username can only contain letters, numbers, periods and underscores.
        // Username can start and end with underscores but never with periods. (for security reasons)
        // Username length should be between 4 and 20 characters.
        // Spaces are not allowed
        if(username !== '') {
            return !username.match(new RegExp("^\\w[\\w.]{2,18}\\w$"));
        } else {
            return false;
        }
        
    };

    const emailHasErrors = () => {
        if(email !== '') {
            return !email.includes('@');
        } else {
            return false;
        }
        
    };

    const passwordHasErrors = () => {
        if(password !== '') {
            return password.length < 8;
        } else {
            return false;
        }
        
    };

    const birthDateHasErrors = () => {
        if(birthDate !== '') {
            return (
                birthDate.length != 10 || birthDate.charAt(2) !== '/' || birthDate.charAt(5)  !== '/'
            )
        } else {
            return false;
        }
        
    };

    const signUp = () => {
        if(usernameHasErrors()){
            alert('Username can only contain letters, numbers, periods and underscores.'+
            'Username can start and end with underscores but never with periods.'+
            'Username length should be between 4 and 20 characters.'+
            'Spaces are not allowed.')
        } else if(emailHasErrors()){
            alert('The email is not valid.')
        } else if(passwordHasErrors()){
            alert('Password characters is less than 8 characters.')
        } else if(birthDateHasErrors()){
            alert('Birth date is in the wrong format.')
        } else if(gender === ''){
            alert('Plaese select your gender.')
        } else {
            let creds = {
                username: username,
                email: email,
                password: password,
                birthDate: birthDate,
                gender: gender,
            }
            console.log(creds)
            props.signUp(creds)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <View>
                        <Image
                            source={require(('../assets/logo.png'))}
                        />
                        <Text style={styles.subTitle}>Welcome! {"\n"} Are you ready to discover car?</Text>
                    </View>
                    <View style={{ width: 250, }}>
                        <TextInput
                            error={usernameHasErrors()}
                            mode="outlined"
                            label="Username"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />
                        <TextInput
                            error={emailHasErrors()}
                            mode="outlined" 
                            label="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput 
                            error={passwordHasErrors()}
                            mode="outlined"
                            label="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TextInput 
                            error={birthDateHasErrors()}
                            mode="outlined"
                            label="Birth date"
                            placeholder="DD/MM/YYYY"
                            value={birthDate}
                            onChangeText={(text) => setBirthDate(text)}
                            onSubmitEditing={signUp}
                        />
                        <DropDown
                            label={'Gender'}
                            mode={'outlined'}
                            visible={showDropDown}
                            showDropDown={() => setShowDropDown(true)}
                            onDismiss={() => setShowDropDown(false)}
                            value={gender}
                            setValue={setGender}
                            list={genderList}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button mode="contained" onPress={signUp}>
                            Sign up
                        </Button>
                    </View>
                    <View style={styles.loginLinkContainer}>
                        <Text style={{ color: "gray" }}>
                            Already a member? {''}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={styles.registerLinkText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (creds) => dispatch(signUp(creds))
    }
}

export default connect(null, mapDispatchToProps)(SignUpScreen)

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
        marginBottom: 40,
    },
    buttonContainer: {
        width: 200,
        margin: 30,
    },
    loginLinkContainer: {
        flexDirection:'row',
        flexWrap:'wrap',
    },
    registerLinkText: {
        color: "gray",
        textDecorationLine: "underline",
    }
})
