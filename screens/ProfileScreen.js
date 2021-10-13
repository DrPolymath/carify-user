import React, { useEffect } from 'react'
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { signOut } from '../actions/auth.action';
import { Entypo } from '@expo/vector-icons'
import InterestedListContainer from '../components/InterestedListContainer';
import FormDialog from '../components/FormDialog';
import UpdateProfilePicture from '../components/forms/UpdateProfilePicture';


const ProfileScreen = (props) => {

    const { auth, profile } = props;
    const { colors } = useTheme();

    useEffect(() => {
        if (auth.isEmpty) {
            props.navigation.replace('Landing')
        }
    }, [auth])

    const handleConfirmation = () => {
        Alert.alert(
            "Deactivation Confirmation",
            "Are you sure you want to deactivate your account?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {   text: "Confirm",
                    onPress: () => console.log("OK Pressed"),
                }
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.upperContainer, { backgroundColor: colors.primary }]}>
                <View style={styles.imageProfileContainer}>
                    <UpdateProfilePicture />
                </View>
                <View style={{ flex: 6 }}>
                        <View style={{ flex: 7, justifyContent: 'center' }}>
                            <Text style={styles.titleInfoText}>{ profile.username }</Text>
                            <Text style={styles.subtitleInfoText}>{ profile.email }</Text>
                            <Text style={styles.subtitleInfoText}>Saved Car</Text>
                        </View>
                        <View style={{ flex: 5}}>
                            {!auth.isEmpty ? (
                                <View style={{ flex: 1, justifyContent: 'flex-start'}}>
                                    <InterestedListContainer auth={auth}/>
                                </View>
                            ) : null }
                        </View>
                </View>
            </View>
            <View style={{ flex: 7, margin: 20}}>
                <View style={styles.buttonContainer}>
                    <Button mode='outlined' labelStyle={{ fontSize: 10 }} onPress={handleConfirmation}>Deactivate</Button>
                    <FormDialog title="Update Interest"/>
                    <FormDialog title='Update Profile'/>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                    <Text style={{ color: colors.primary, fontSize: 16 }}>Details</Text>
                    <Entypo name="log-out" color={colors.primary} size={20} onPress={props.signOut} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row'}} >
                    <View style={{ flex: 4, justifyContent: "space-around"}}>
                        <Text>First Name</Text>
                        <Text>Last Name</Text>
                        <Text>Email Address</Text>
                        <Text>Phone Number</Text>
                        <Text>Gender</Text>
                    </View>
                    <View style={{ flex: 6, justifyContent: 'space-around'}}>
                        <Text style={styles.profileText}>{ profile.firstname }</Text>
                        <Text style={styles.profileText}>{ profile.lastname }</Text>
                        <Text style={styles.profileText}>{ profile.email }</Text>
                        <Text style={styles.profileText}>{ profile.phoneNumber }</Text>
                        <Text style={styles.profileText}>{ profile.gender }</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    upperContainer: {
        flex: 4,
        flexDirection: "row",
    },
    imageProfileContainer: {
        flex: 5, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleInfoText: {
        color: 'white',
        fontSize: 32,
    },
    subtitleInfoText: {
        color: 'white',
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center"
    },
    profileText: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor : "#ffffff"
    }
})