import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DataTable, useTheme } from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const Table = ({ carBrandObject, carModelObject, carVariantObject }) => {

    const { colors } = useTheme();
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <DataTable style={{ paddingHorizontal: 10 }}>
            <DataTable.Header style={{ backgroundColor: colors.primary }}>
                <DataTable.Title><Text style={{ color: 'white' }}>Overview</Text></DataTable.Title>
                <DataTable.Title numeric><Text style={{ color: 'white' }}>{carBrandObject.carBrandName} {carModelObject.carModelName}</Text></DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
                <DataTable.Cell>Brand</DataTable.Cell>
                <DataTable.Cell numeric>{carBrandObject.carBrandName}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Starting Price</DataTable.Cell>
                <DataTable.Cell numeric>{carVariantObject.price}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Instalment Estimation</DataTable.Cell>
                <DataTable.Cell numeric></DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Available color(s)</DataTable.Cell>
                <DataTable.Cell numeric></DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Vehicle Type</DataTable.Cell>
                <DataTable.Cell numeric></DataTable.Cell>
            </DataTable.Row>

            {/* <DataTable.Pagination
                page={page}
                numberOfPages={3}
                onPageChange={(page) => setPage(page)}
                label="1-2 of 6"
                optionsPerPage={optionsPerPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={'Rows per page'}
            /> */}
        </DataTable>
    )
}

export default Table

const styles = StyleSheet.create({})
