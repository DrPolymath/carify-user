import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/profile.action';

const UpdateProfileForm = (props) => {

    const { profile, hideDialog } = props;
    const [showDropDown, setShowDropDown] = useState(false);
    const [username, setUsername] = useState(profile.username);
    const [firstname, setFirstname] = useState(profile.firstname);
    const [lastname, setLastname] = useState(profile.lastname);
    const [email, setEmail] = useState(profile.email);
    const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber);
    const [gender, setGender] = useState(profile.gender);

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

    const updateProfile = () => {
        let creds = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
        }
        props.updateProfile(creds)
        hideDialog()
    }

    return (
        <View>
            <TextInput
                mode="outlined"
                label="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
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
                mode="outlined" 
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput 
                mode="outlined"
                label="Phone Number"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                onSubmitEditing={updateProfile}
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
            <Button style={{ marginTop: 20 }} mode="contained" onPress={updateProfile}>
                Update Profile
            </Button>
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
