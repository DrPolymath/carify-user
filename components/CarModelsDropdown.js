import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import DropDown from 'react-native-paper-dropdown';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

const CarModelsDropdown = ({ carBrand, carModel, handleSetCarModel }) => {

    useFirestoreConnect([
        {
            collection: 'carBrand',
            doc: carBrand,
            subcollections: [
                {
                    collection: 'carModel'
                }
            ],
            storeAs: 'carModel',
        },
    ]) // sync todos collection from Firestore into redux
    console.log(carModel)

    const carModels = useSelector((state) => state.firestore.data.carModel)
    let tempCarModels;

    if(carModels) {
        tempCarModels = Object
                            .entries(carModels)
                            .map(key => ({ 
                                ...key[1],
                                id:key[0],
                            }))
        
        
        tempCarModels = tempCarModels.map(item => {
            return {
                ...item,
                key: item.id,
                label: item.carModelName,
                value: item.id,
            };
        });
    }
    
    console.log(carModels)

    const [showDropDown, setShowDropDown] = useState(false);

    const [openCarModel, setOpenCarModel] = useState(false);
    const [carModelList, setCarModelList] = useState(tempCarModels);

    return (
        <View style={{ marginTop: 200 }}>
            {carModels ? (
                <DropDownPicker
                dropDownDirection="TOP"
                    placeholder="Select Car Model"
                    open={openCarModel}
                    value={carModel}
                    items={carModelList}
                    setOpen={setOpenCarModel}
                    setValue={handleSetCarModel}
                    setItems={setCarModelList}
                />
                
            ) : null }
            {/* <DropDown
                    label={'Car Model'}
                    mode={'outlined'}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={carModel}
                    setValue={(val) => handleSetCarModel(val)}
                    list={tempCarModels}
                /> */}
        </View>
    )
}

export default CarModelsDropdown

const styles = StyleSheet.create({})
