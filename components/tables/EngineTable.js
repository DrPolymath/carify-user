import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DataTable, useTheme } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const EngineTable = ({ carVariantEngine }) => {

    let processedCarVariantEngine = Object.entries(carVariantEngine).map(key => ({ ...key[1] }));

    const { colors } = useTheme();
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    // let price = parseInt(JSON.stringify(selectedCar.price).replace(/\D/g, ""));
    // let totalInterest = 3 / 100 * price * 5;
    // let monthlyInterest = totalInterest/( 5 * 12 );
    // let monthlyInstallment = (price+totalInterest)/(5*12);

    // const convertToRM = (amount) => {
    //     return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    // }

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    if(processedCarVariantEngine[0].carEnergyType === "Gas"){
        return (
            <DataTable style={{ backgroundColor: 'white' }}>
                <DataTable.Header style={{ backgroundColor: colors.primary }}>
                    <DataTable.Title><Text style={{ color: 'white' }}>Engine</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{ color: 'white' }}></Text></DataTable.Title>
                </DataTable.Header>
    
                <DataTable.Row>
                    <DataTable.Cell>Fuel Supply System</DataTable.Cell>
                    <DataTable.Cell numeric><Text>{processedCarVariantEngine[0].fuelSupplySystem}</Text></DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>Valve Configuration</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].valveConfiguration}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>Engine</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].engine}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>Valve Per Cylinder</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].valvesPerCylinder}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>No. Of Cylinders</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].noOfCylinder}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        )
    } else {
        return (
            <DataTable style={{ backgroundColor: 'white' }}>
                <DataTable.Header style={{ backgroundColor: colors.primary }}>
                    <DataTable.Title><Text style={{ color: 'white' }}>Engine</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={{ color: 'white' }}></Text></DataTable.Title>
                </DataTable.Header>
    
                <DataTable.Row>
                    <DataTable.Cell>Battery Type</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].batteryType}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>Motor Type</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].batteryType}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>AC Charging (0-100%)</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].batteryType}</DataTable.Cell>
                </DataTable.Row>
                
                <DataTable.Row>
                    <DataTable.Cell>Estimated Fast Charging Time</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].motorType}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>Estimated Fast Charging Time</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].estimatedFastChargingTime}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>Battery Capacity</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].batteryCapacity}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>Battery Voltage</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].batteryVoltage}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>DC Charging</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].dcCharging}</DataTable.Cell>
                </DataTable.Row>
    
                <DataTable.Row>
                    <DataTable.Cell>Estimated Regular Charging Time</DataTable.Cell>
                    <DataTable.Cell numeric>{processedCarVariantEngine[0].estimatedRegularChargingTime}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
        )
    }

    
}

export default EngineTable

const styles = StyleSheet.create({})