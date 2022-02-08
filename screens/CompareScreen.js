import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import InputCompareCardFirst from '../components/InputCompareCardFirst'
import InputCompareCardSecond from '../components/InputCompareCardSecond'
import InputCompareCardThird from '../components/InputCompareCardThird'
import OutputCompareFirst from '../components/OutputCompareFirst'
import OutputCompareSecond from '../components/OutputCompareSecond'
import OutputCompareThird from '../components/OutputCompareThird'

const CompareScreen = () => {

    const [carBrand, setCarBrand] = useState(null)
    const [carModel, setCarModel] = useState(null)
    const [carVariant, setCarVariant] = useState(null)

    const handleSetCarBrand = (carBrand) => {
        setCarBrand(carBrand)
        setCarModel(null)
        setCarVariant(null)
    }

    const handleSetCarModel = (carModel) => {
        setCarModel(carModel)
        setCarVariant(null)
    }

    const handleSetCarVariant = (carVariant) => {
        setCarVariant(carVariant)
        if(carVariant!=null&&!(carVariant instanceof Function)){
            console.log(carBrand)
            console.log(carModel)
            console.log(carVariant)
            updateClick(carBrand,carModel,carVariant)
        }
    }

    const handleClear = () => {
        setCarBrand(null)
        setCarModel(null)
        setCarVariant(null)
    }

    useEffect(() => {
      if(carVariant!=null){
          console.log(carBrand)
          console.log(carModel)
          console.log(carVariant)
        // updateClick(carBrand,carModel,carVariant)
      }
    }, [carVariant]);
    

    const [carBrandSecond, setCarBrandSecond] = useState(null)
    const [carModelSecond, setCarModelSecond] = useState(null)
    const [carVariantSecond, setCarVariantSecond] = useState(null)

    const handleSetCarBrandSecond = (carBrand) => {
        setCarBrandSecond(carBrand)
        setCarModelSecond(null)
        setCarVariantSecond(null)
    }

    const handleSetCarModelSecond = (carModel) => {
        setCarModelSecond(carModel)
        setCarVariantSecond(null)
    }

    const handleSetCarVariantSecond = (carVariant) => {
        setCarVariantSecond(carVariant)
    }

    const handleClearSecond = () => {
        setCarBrandSecond(null)
        setCarModelSecond(null)
        setCarVariantSecond(null)
    }

    const [carBrandThird, setCarBrandThird] = useState(null)
    const [carModelThird, setCarModelThird] = useState(null)
    const [carVariantThird, setCarVariantThird] = useState(null)

    const handleSetCarBrandThird = (carBrand) => {
        setCarBrandThird(carBrand)
        setCarModelThird(null)
        setCarVariantThird(null)
    }

    const handleSetCarModelThird = (carModel) => {
        setCarModelThird(carModel)
        setCarVariantThird(null)
    }

    const handleSetCarVariantThird = (carVariant) => {
        setCarVariantThird(carVariant)
    }

    const handleClearThird = () => {
        setCarBrandThird(null)
        setCarModelThird(null)
        setCarVariantThird(null)
    }

    return (
        <View style={styles.container}>
            <Swiper
                showsButtons={true}
                showsPagination={false}
                loop={false}
            >
                <View style={styles.slide}>
                    {(carBrand === null || carModel === null || carVariant === null) ? (
                        <InputCompareCardFirst
                            carBrand={carBrand}
                            handleSetCarBrand={handleSetCarBrand}
                            carModel={carModel}
                            handleSetCarModel={handleSetCarModel}
                            carVariant={carVariant}
                            handleSetCarVariant={handleSetCarVariant}
                        />
                    ) : (
                        <OutputCompareFirst
                            carBrand={carBrand}
                            carModel={carModel}
                            carVariant={carVariant}
                            handleClear={handleClear}
                        />
                    )}
                </View>
                <View style={styles.slide}>
                    {(carBrandSecond === null || carModelSecond === null || carVariantSecond === null) ? (
                        <InputCompareCardSecond
                            carBrand={carBrandSecond}
                            handleSetCarBrand={handleSetCarBrandSecond}
                            carModel={carModelSecond}
                            handleSetCarModel={handleSetCarModelSecond}
                            carVariant={carVariantSecond}
                            handleSetCarVariant={handleSetCarVariantSecond}
                        />
                    ) : (
                        <OutputCompareSecond
                            carBrand={carBrandSecond}
                            carModel={carModelSecond}
                            carVariant={carVariantSecond}
                            handleClear={handleClearSecond}
                        />
                    )}
                </View>
                <View style={styles.slide}>
                    {(carBrandThird === null || carModelThird === null || carVariantThird === null) ? (
                        <InputCompareCardThird
                            carBrand={carBrandThird}
                            handleSetCarBrand={handleSetCarBrandThird}
                            carModel={carModelThird}
                            handleSetCarModel={handleSetCarModelThird}
                            carVariant={carVariantThird}
                            handleSetCarVariant={handleSetCarVariantThird}
                        />
                    ) : (
                        <OutputCompareThird
                            carBrand={carBrandThird}
                            carModel={carModelThird}
                            carVariant={carVariantThird}
                            handleClear={handleClearThird}
                        />
                    )}
                </View>
            </Swiper>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        updateClick: (carBrand,carModel,carVariant) => dispatch(updateClick(carBrand,carModel,carVariant)),
    }
}

export default connect(null, mapDispatchToProps)(CompareScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
    },
})