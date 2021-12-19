import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import { Button, useTheme } from 'react-native-paper'
import { updateInterestedCarBrand, updateInterestedCarType, updateInterestedPriceRange } from '../actions/profile.action'
import { connect } from 'react-redux'

const MultiSelectBox = (props) => {

    const { colors } = useTheme();
    const { hideDialog,
            interestedCarBrands, 
            interestedCarTypes,
            interestedPriceRanges,
            carBrands,
            carTypes,
            priceRanges,
            updateInterestedCarBrand,
            updateInterestedCarType,
            updateInterestedPriceRange,
             } = props;

    const processedInterestedCarBrands = Object.entries(interestedCarBrands).map(key => ({ ...key[1], interestId: key[0], item: key[1].carBrandName}));
    const processedCarBrands = Object.entries(carBrands).map(key => ({ ...key[1], id:key[0], item: key[1].carBrandName}))
    const processedInterestedCarTypes = Object.entries(interestedCarTypes).map(key => ({ ...key[1], interestId: key[0], item: key[1].carTypeName}));
    const processedCarTypes = Object.entries(carTypes).map(key => ({ ...key[1], id:key[0], item: key[1].carTypeName}))
    const processedInterestedPriceRanges = Object.entries(interestedPriceRanges).map(key => ({ ...key[1], interestId: key[0], item: "< " + key[1].maxPrice}));
    const processedPriceRanges = Object.entries(priceRanges).map(key => ({ ...key[1], id:key[0], item: "< " + key[1].maxPrice}))

    const [selectedCarBrands, setSelectedCarBrands] = useState(processedInterestedCarBrands)
    const [selectedCarTypes, setSelectedCarTypes] = useState(processedInterestedCarTypes)
    const [selectedPriceRanges, setSelectedPriceRanges] = useState(processedInterestedPriceRanges)

    const onMultiChangeCarBrands = () => {
        return (item) => setSelectedCarBrands(xorBy(selectedCarBrands, [item], 'id'))
    }
    const onMultiChangeCarTypes = () => {
        return (item) => setSelectedCarTypes(xorBy(selectedCarTypes, [item], 'id'))
    }
    const onMultiChangePriceRanges = () => {
        return (item) => setSelectedPriceRanges(xorBy(selectedPriceRanges, [item], 'id'))
    }

    const updateInterest = () => {
        if(selectedCarBrands.length === 0) {
            console.log('Please select at least one car brand')
        }
        if(selectedCarTypes.length === 0) {
            console.log('Please select at least one car type')
        }
        if(selectedPriceRanges.length === 0) {
            console.log('Please select at least one price range')
        }


        if(selectedCarBrands.length !== 0 && selectedCarTypes.length !== 0 && selectedPriceRanges.length !== 0) {
            updateInterestedCarBrand(selectedCarBrands, processedInterestedCarBrands)
            updateInterestedCarType(selectedCarTypes, processedInterestedCarTypes)
            updateInterestedPriceRange(selectedPriceRanges, processedInterestedPriceRanges)
            hideDialog()
        }
    }

    return (
        <View>
            <SelectBox
                hideInputFilter={false}
                multiOptionContainerStyle={{ backgroundColor: colors.primary }}
                arrowIconColor={colors.primary}
                searchIconColor={colors.primary}
                toggleIconColor={colors.primary}
                label="Car Brand"
                options={processedCarBrands}
                selectedValues={selectedCarBrands}
                onMultiSelect={onMultiChangeCarBrands()}
                onTapClose={onMultiChangeCarBrands()}
                isMulti
            />
            <View style={{height: 10}} />
            <SelectBox
                hideInputFilter={false}
                multiOptionContainerStyle={{ backgroundColor: colors.primary }}
                arrowIconColor={colors.primary}
                searchIconColor={colors.primary}
                toggleIconColor={colors.primary}
                label="Car Type"
                options={processedCarTypes}
                selectedValues={selectedCarTypes}
                onMultiSelect={onMultiChangeCarTypes()}
                onTapClose={onMultiChangeCarTypes()}
                isMulti
            />
            <View style={{height: 10}} />
            <SelectBox
                hideInputFilter={false}
                multiOptionContainerStyle={{ backgroundColor: colors.primary }}
                arrowIconColor={colors.primary}
                searchIconColor={colors.primary}
                toggleIconColor={colors.primary}
                label="Price Range"
                options={processedPriceRanges}
                selectedValues={selectedPriceRanges}
                onMultiSelect={onMultiChangePriceRanges()}
                onTapClose={onMultiChangePriceRanges()}
                isMulti
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <Button mode="contained" onPress={hideDialog} style={{ width:'45%' }}>
                    Cancel
                </Button>
                <Button mode="contained" onPress={updateInterest} style={{ width:'45%' }}>
                    Save
                </Button>
            </View>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateInterestedCarBrand: (selectedCarBrands, prevSelectedCarBrands) => dispatch(updateInterestedCarBrand(selectedCarBrands, prevSelectedCarBrands)),
        updateInterestedCarType: (selectedCarTypes, prevSelectedCarTypes) => dispatch(updateInterestedCarType(selectedCarTypes, prevSelectedCarTypes)),
        updateInterestedPriceRange: (selectedPriceRanges, prevSelectedPriceRanges) => dispatch(updateInterestedPriceRange(selectedPriceRanges, prevSelectedPriceRanges)),
    }
}

export default connect(null, mapDispatchToProps)(MultiSelectBox)

const styles = StyleSheet.create({})
