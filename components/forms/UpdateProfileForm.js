import React, { useState } from 'react'
import { StyleSheet, ToastAndroid, View } from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/profile.action';

const UpdateProfileForm = (props) => {

    const { profile, hideDialog } = props;
    const [showDropDown, setShowDropDown] = useState(false);
    const [username, setUsername] = useState(profile.username);
    const [firstname, setFirstname] = useState(profile.firstname);
    const [lastname, setLastname] = useState(profile.lastname);
    const [birthDate, setBirthDate] = useState(profile.birthDate);
    const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);
    const [gender, setGender] = useState(profile.gender);

    const genderList = [
        {
          label: 'Male',
          value: 'Male',
        },
        {
          label: 'Female',
          value: 'Female',
        },
    ];
    const usernameHasErrors = () => {
        // Username can only contain letters, numbers, periods and underscores.
        // Username can start and end with underscores but never with periods. (for security reasons)
        // Username length should be between 4 and 20 characters.
        // Spaces are not allowed
        if(username !== '') {
            // return !username.match(new RegExp("/^[a-zA-Z]+$/"));
            return !/^[A-Za-z0-9_]{4,20}$/.test(username);
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

    const phoneNumberHasErrors = () => {
        if(phoneNumber === undefined){
            return false;
        } else if(phoneNumber !== '') {
            const string = phoneNumber
            // return !username.match(new RegExp("/^[a-zA-Z]+$/"));
            return !string.match("(\\+?6?01)[02-46-9]-*[0-9]{7}$|^(\\+?6?01)[1]-*[0-9]{8}$");
        } else {
            return false;
        }
    };


    const updateProfile = () => {
        if(usernameHasErrors()){
            ToastAndroid.showWithGravityAndOffset(
                "Username can only contain letters, numbers and underscores and also should be between 4 and 20 characters.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else if(birthDateHasErrors()){
            ToastAndroid.showWithGravityAndOffset(
                "Birth date is in the wrong format.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else if(phoneNumberHasErrors()){
            ToastAndroid.showWithGravityAndOffset(
                "Phone number is in the wrong format!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else if(gender === ''){
            ToastAndroid.showWithGravityAndOffset(
                "Please select your gender.",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else if(username === ''||firstname === ''||lastname === ''||birthDate === ''||phoneNumber === ''||gender === '') {
            ToastAndroid.showWithGravityAndOffset(
                "Please fill in all the fields to update!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            let creds = {
                username: username,
                firstname: firstname,
                lastname: lastname,
                birthDate: birthDate,
                phoneNumber: phoneNumber,
                gender: gender,
            }
            props.updateProfile(creds)
            hideDialog()
        }
    }

    return (
        <View>
            <TextInput
                error={usernameHasErrors()}
                mode="outlined"
                label="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            {usernameHasErrors() ? (
                <HelperText type="error">
                    Username can only contain letters, numbers and underscores and also should be between 4 and 20 characters.
                </HelperText>
            ): null}
            <TextInput
                mode="outlined"
                label="Firstname"
                value={firstname}
                onChangeText={(text) => setFirstname(text)}
            />
            <TextInput
                mode="outlined"
                label="Lastname"
                value={lastname}
                onChangeText={(text) => setLastname(text)}
            />
            <TextInput 
                error={birthDateHasErrors()}
                mode="outlined"
                label="Birth date"
                placeholder="DD/MM/YYYY"
                value={birthDate}
                onChangeText={(text) => setBirthDate(text)}
            />
            {birthDateHasErrors() ? (
                <HelperText type="error">
                    The birthdate format should be DD/MM/YYYY.
                </HelperText>
            ): null}
            <TextInput 
                error={phoneNumberHasErrors()}
                mode="outlined"
                label="Phone Number"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                onSubmitEditing={updateProfile}
            />
            {phoneNumberHasErrors() ? (
                <HelperText type="error">
                    The phone number is in the wrong format!
                </HelperText>
            ): null}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Button mode="contained" onPress={hideDialog} style={{ width:'45%' }}>
                    Cancel
                </Button>
                <Button mode="contained" onPress={updateProfile} style={{ width:'45%' }}>
                    Update
                </Button>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (creds) => dispatch(updateProfile(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileForm)

const styles = StyleSheet.create({})
