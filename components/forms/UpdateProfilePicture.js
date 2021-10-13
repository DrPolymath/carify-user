import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button, useTheme } from 'react-native-paper';
import * as firebase from "firebase";
import { connect } from 'react-redux';
import { updateProfilePicture } from '../../actions/profile.action';

const UpdateProfilePicture = (props) => {

    const { profile, auth } = props;
    const { colors } = useTheme();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(null);

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    useEffect(() => {
        if(image) {
            let newProfile = {
                ...profile,
                url: image,
            }
            props.updateProfilePicture(newProfile);
        }
    }, [image])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        handleImagePicked(result);
    };

    const handleImagePicked = async (result) => {
        try {
            setUploading(true)
      
            if (!result.cancelled) {
                const uploadUrl = await uploadImageAsync(result.uri);
                setImage(uploadUrl)
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            setUploading(false);
        }
    }

    async function uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const ref = firebase.default.storage().ref().child(`avatars/${auth.uid}`);
        const snapshot = await ref.put(blob, { contentType: "image/png" });
    
        // We're done with the blob, close and release it
        blob.close();
    
        return await snapshot.ref.getDownloadURL();
    }

    const maybeRenderImage = () => {
        if (!image) {

            if(profile.url) {
                return (
                    <Image
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 500,
                            resizeMode: 'contain',
                        }}
                        source={{ uri: profile.url}}
                    />
                );
            }

            return (
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain',
                    }}
                    source={require('../../assets/avatar_placeholder.png')}
                />
            );
        }
      
        return (
            <View
                style={{
                    width: 250,
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        borderTopRightRadius: 3,
                        borderTopLeftRadius: 3,
                        shadowColor: "rgba(0,0,0,1)",
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 4, height: 4 },
                        shadowRadius: 5,
                        overflow: "hidden",
                        alignItems: 'center',
                    }}
                >
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 250, }} />
                </View>
            </View>
        );
    }

    const maybeRenderUploadingOverlay = () => {
        if (uploading) {
            return (
                <View
                    style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator color="#fff" animating size="large" />
                </View>
              );
        }
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
            {uploading ? (
                maybeRenderUploadingOverlay()
             ) : (
                maybeRenderImage()
             )}
            <Button onPress={pickImage} mode='contained' color={colors.accent} labelStyle={{ fontSize: 8 }} style={{ marginTop: 10 }}>
                Change
            </Button>
        </View>
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
        updateProfilePicture: (newProfile) => dispatch(updateProfilePicture(newProfile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfilePicture)

const styles = StyleSheet.create({})
