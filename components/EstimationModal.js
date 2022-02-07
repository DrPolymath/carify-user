import { Alert, Modal, StyleSheet, Text, Pressable, View, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { TextInput, useTheme } from "react-native-paper";

const EstimationModal = ({ carVariantObject }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [downPayment, setDownPayment] = useState(null);
    const [interestRate, setInterestRate] = useState(null);
    const [loanPeriod, setLoanPeriod] = useState(null);
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const { colors } = useTheme();

    const convertToRM = (amount) => {
        return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    }

    const calculateLoan = () => {
        if(downPayment == null){
            ToastAndroid.showWithGravityAndOffset(
                "Please enter the down payment!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else if(interestRate == null) {
            ToastAndroid.showWithGravityAndOffset(
                "Please enter the interest rate!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else if(loanPeriod == null) {
            ToastAndroid.showWithGravityAndOffset(
                "Please enter the loan period!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            var regex = /^[0-9]*\.?[0-9]*$/;
            let dP = downPayment
            let iR = interestRate
            let lP = loanPeriod
            if(!dP.match(regex)){
                ToastAndroid.showWithGravityAndOffset(
                    "Please enter the valid down payment!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else if (!iR.match(regex)){
                ToastAndroid.showWithGravityAndOffset(
                    "Please enter the valid interest rate!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else if (!lP.match(regex)){
                ToastAndroid.showWithGravityAndOffset(
                    "Please enter the valid loan period!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50
                );
            } else {
                let price = parseFloat(JSON.stringify(carVariantObject.price).replace(/\D/g, ""));
                let priceAfterDownPayment = price - parseFloat(downPayment)
                let totalInterest = parseFloat(interestRate) / 100 * priceAfterDownPayment * parseFloat(loanPeriod);
                let monthlyInstallment = (priceAfterDownPayment+totalInterest)/(parseFloat(loanPeriod)*12);
                setMonthlyPayment(monthlyInstallment)
            }
        }
    }

    const clearField = () => {
        setDownPayment(null)
        setInterestRate(null)
        setLoanPeriod(null)
        setMonthlyPayment(null)
    }

    const closeModal = () => {
        setDownPayment(null)
        setInterestRate(null)
        setLoanPeriod(null)
        setMonthlyPayment(null)
        setModalVisible(true)
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ textAlign: "center", fontSize: 28, fontWeight: "bold", backgroundColor: colors.primary, padding: 20, color: "white"}}>Loan Calculator</Text>
                        <Text style={[{ color: colors.primary },styles.modalText]}>{carVariantObject.price}</Text>
                        <TextInput
                            mode="outlined"
                            label="Down Payment"
                            value={downPayment}
                            onChangeText={(text) => setDownPayment(text)}
                        />
                        <TextInput
                            mode="outlined"
                            label="Interest Rate"
                            value={interestRate}
                            onChangeText={(text) => setInterestRate(text)}
                        />
                        <TextInput
                            mode="outlined"
                            label="Loan Period"
                            value={loanPeriod}
                            onChangeText={(text) => setLoanPeriod(text)}
                        />
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 18, textAlign: "center", color: colors.primary }}>Monthly Installment:</Text>
                            {monthlyPayment ? (
                                <Text style={{ fontSize: 24, textAlign: "center" }}>RM {convertToRM(monthlyPayment)}</Text>
                            ) : null}
                        </View>
                        
                        <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-around" }}>
                            <Pressable
                                style={[{ backgroundColor: colors.primary, width: 100 }, styles.button]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                            <Pressable
                                style={[{ backgroundColor: colors.primary, width: 100 }, styles.button]}
                                onPress={clearField}
                            >
                                <Text style={styles.textStyle}>Clear</Text>
                            </Pressable>
                            <Pressable
                                style={[{ backgroundColor: colors.primary, width: 100 }, styles.button]}
                                onPress={calculateLoan}
                            >
                                <Text style={styles.textStyle}>Calculate</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[{ backgroundColor: colors.primary }, styles.button]}
                onPress={closeModal}
            >
                <Text style={styles.textStyle}>Loan Calculator</Text>
            </Pressable>
        </View>
    );
};

export default EstimationModal;

const styles = StyleSheet.create({
    centeredView: {
        width: 350,
        alignSelf: "center",
        marginTop: 100
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10
    },
    textStyle: {
        color: "white",
        textAlign: "center",
        fontSize: 16
    },
    button: {
        marginTop: 10,
        padding: 10,
        elevation: 4
    },
    modalText: {
        fontSize: 30,
        marginTop: 15,
        marginBottom: 15,
        textAlign: "center"
    }
});
