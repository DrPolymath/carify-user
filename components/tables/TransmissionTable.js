import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DataTable, useTheme } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const TransmissionTable = ({ carVariantTransmission }) => {

    let processedCarVariantTransmission = Object.entries(carVariantTransmission).map(key => ({ ...key[1] }));

    const { colors } = useTheme();
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <DataTable style={{ backgroundColor: 'white' }}>
            <DataTable.Header style={{ backgroundColor: colors.primary }}>
                <DataTable.Title><Text style={{ color: 'white' }}>Transmission</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={{ color: 'white' }}></Text></DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
                <DataTable.Cell>Transmission Type</DataTable.Cell>
                <DataTable.Cell numeric><Text>{processedCarVariantTransmission[0].transmissionType}</Text></DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Drive Type</DataTable.Cell>
                <DataTable.Cell numeric>{processedCarVariantTransmission[0].driveType}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Gear Box</DataTable.Cell>
                <DataTable.Cell numeric>{processedCarVariantTransmission[0].gearBox}</DataTable.Cell>
            </DataTable.Row>
        </DataTable>
    )
}

export default TransmissionTable

const styles = StyleSheet.create({})