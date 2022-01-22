import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DataTable, useTheme } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const InfoTable = ({ selectedCar, carVariantColors }) => {

    const { colors } = useTheme();
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    let price = parseInt(JSON.stringify(selectedCar.price).replace(/\D/g, ""));
    let totalInterest = 3 / 100 * price * 5;
    let monthlyInterest = totalInterest/( 5 * 12 );
    let monthlyInstallment = (price+totalInterest)/(5*12);

    const convertToRM = (amount) => {
        return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
    }

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <DataTable style={{ backgroundColor: 'white' }}>
            <DataTable.Header style={{ backgroundColor: colors.primary }}>
                <DataTable.Title><Text style={{ color: 'white' }}>Overview</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={{ color: 'white' }}>{selectedCar.carBrandName} {selectedCar.carModelName}</Text></DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
                <DataTable.Cell>Brand</DataTable.Cell>
                <DataTable.Cell numeric>{selectedCar.carBrandName}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Starting Price</DataTable.Cell>
                <DataTable.Cell numeric>{selectedCar.price}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Instalment Estimation</DataTable.Cell>
                <DataTable.Cell numeric>RM {convertToRM(monthlyInstallment)}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Available color(s)</DataTable.Cell>
                <DataTable.Cell numeric>
                    <View style={{ flexDirection: 'row'}}>
                        {Object.keys(carVariantColors).map((key, index) =>
                            <View key={index} style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: "#"+carVariantColors[key].colorCode, marginHorizontal: 2, borderWidth: 1, borderColor: 'grey' }}>

                            </View>
                        )}
                    </View>
                </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Vehicle Type</DataTable.Cell>
                <DataTable.Cell numeric>{selectedCar.bodyType}</DataTable.Cell>
            </DataTable.Row>
        </DataTable>
    )
}

export default InfoTable

const styles = StyleSheet.create({})