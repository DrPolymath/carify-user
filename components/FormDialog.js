import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal, useTheme } from 'react-native-paper';
import UpdateInterestForm from './forms/UpdateInterestForm';
import UpdateProfileForm from './forms/UpdateProfileForm';

const FormDialog = ({ title }) => {

    const { colors } = useTheme();
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return (
        <View>
            {title === 'Update Profile' ? (
                <Button onPress={showDialog} mode='outlined' style={{ backgroundColor: 'white', borderWidth: 0, elevation: 3 }} labelStyle={{ fontSize: 10 }}>Update Profile</Button>
            ) : (
                <Button onPress={showDialog} mode='outlined' style={{ backgroundColor: 'white', borderWidth: 0, elevation: 3 }} labelStyle={{ fontSize: 10 }}>Update Interest</Button>
            )}
            <Portal>
            <Dialog  visible={visible} onDismiss={hideDialog}>
                <Dialog.Title style={{ textAlign: 'center', color: colors.primary }}>{title}</Dialog.Title>
                <Dialog.Content>
                    {title === 'Update Profile' ? (
                        <UpdateProfileForm hideDialog={hideDialog}/>
                    ) : (
                        <UpdateInterestForm hideDialog={hideDialog}/>
                    ) }
                </Dialog.Content>
            </Dialog>
            </Portal>
        </View>
    )
}

export default FormDialog

const styles = StyleSheet.create({})
