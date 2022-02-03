import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DataTable, useTheme } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const PerformanceTable = ({ carVariantPerformance }) => {

    let processedCarVariantPerformance = Object.entries(carVariantPerformance).map(key => ({ ...key[1] }));

    const { colors } = useTheme();
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <DataTable style={{ backgroundColor: 'white' }}>
            <DataTable.Header style={{ backgroundColor: colors.primary }}>
                <DataTable.Title><Text style={{ color: 'white' }}>Performance</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={{ color: 'white' }}></Text></DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
                <DataTable.Cell>Fuel Type</DataTable.Cell>
                <DataTable.Cell numeric><Text>{processedCarVariantPerformance[0].fuelType}</Text></DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Torque</DataTable.Cell>
                <DataTable.Cell numeric>{processedCarVariantPerformance[0].torque}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Engine Displacement</DataTable.Cell>
                <DataTable.Cell numeric>{processedCarVariantPerformance[0].engineDisplacement}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Power</DataTable.Cell>
                <DataTable.Cell numeric>{processedCarVariantPerformance[0].power}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Acceleration</DataTable.Cell>
                <DataTable.Cell numeric>{processedCarVariantPerformance[0].acceleration}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Top Speed</DataTable.Cell>
                <DataTable.Cell numeric>{processedCarVariantPerformance[0].topSpeed}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Fuel Consumption</DataTable.Cell>
                <DataTable.Cell numeric>{processedCarVariantPerformance[0].fuelConsumption}</DataTable.Cell>
            </DataTable.Row>
        </DataTable>
    )
}

export default PerformanceTable

const styles = StyleSheet.create({})