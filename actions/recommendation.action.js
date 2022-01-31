export const fetchRecommendedInput = (carBrandId, bodyType, priceRange) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore
            .collection('carBrand')
            .doc(carBrandId)
            .collection('carModel')
            .get()
            .then((snapshot) => {
                let carModels = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data }
                })

                let cmId;

                for (let i = 0; i < carModels.length; i++) {
                    if (carModels[i].bodyType == bodyType){
                        cmId = carModels[i].id;
                    }
                }

                firestore
                    .collection('carBrand')
                    .doc(carBrandId)
                    .collection('carModel')
                    .doc(cmId)
                    .collection('carVariant')
                    .get()
                    .then((snapshot) => {
                        let recommendedInput = snapshot.docs.map(doc => {
                            const data = doc.data();
                            const id = doc.id;
                            return{id, ...data }
                        })

                        dispatch({ type: 'RECOMMENDED_INPUT_STATE_CHANGED', recommendedInput })
                    })
                    .catch((err) => {
                        console.error(err)
                    })

            })
            .catch((err) => {
                console.error(err)
            })
    }
}

export const fetchTopCar = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore
            .collection('carBrand')
            .get()
            .then((snapshot) => {
                let carBrand = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data }
                })

                let RTC = [];

                for(let i = 0; i < carBrand.length; i++){
                    firestore
                        .collection('carBrand')
                        .doc(carBrand[i].id)
                        .collection('carModel')
                        .get()
                        .then((snapshot) => {
                            let carModel = snapshot.docs.map(doc => {
                                const data = doc.data();
                                const id = doc.id;
                                return{id, ...data }
                            })

                            for(let j = 0; j < carModel.length; j++){

                                firestore
                                    .collection('carBrand')
                                    .doc(carBrand[i].id)
                                    .collection('carModel')
                                    .doc(carModel[j].id)
                                    .collection('carVariant')
                                    .get()
                                    .then((snapshot) => {
                                        let carVariant = snapshot.docs.map(doc => {
                                            const data = doc.data();
                                            const id = doc.id;
                                            return{id, ...data }
                                        })

                                        for(let k = 0; k < carVariant.length; k++){
                                            RTC.push({
                                                carBrandId: carBrand[i].id,
                                                carBrandName: carBrand[i].carBrandName,
                                                carBrandUrl: carBrand[i].url,
                                                carModelId: carModel[j].id,
                                                carModelName: carModel[j].carModelName,
                                                carModelUrl: carModel[j].url,
                                                bodyType: carModel[j].bodyType,
                                                carVariantId: carVariant[k].id,
                                                carVariantName: carVariant[k].carVariantName,
                                                price: carVariant[k].price,
                                                femaleClick: carVariant[k].femaleClick,
                                                maleClick: carVariant[k].maleClick,
                                                totalClick: carVariant[k].totalClick
                                            })
                                        }

                                        let sortedRecommendedTopCar = RTC.sort(function (a, b) {
                                            return b.totalClick - a.totalClick;
                                        })

                                        let recommendedTopCar = sortedRecommendedTopCar.slice(0, 20);

                                        dispatch({ type: 'RECOMMENDED_TOP_CAR_STATE_CHANGED', recommendedTopCar })

                                    }).catch((err) => {
                                        console.error(err)
                                    })

                                
                            }

                        }).catch((err) => {
                            console.error(err)
                        })
                }
            }).catch((err) => {
                console.error(err)
            })
    }
}

export const fetchTopBrand = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore
            .collection('carBrand')
            .get()
            .then((snapshot) => {
                let carBrand = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data }
                })

                let RTC = [];

                for(let i = 0; i < carBrand.length; i++){
                    firestore
                        .collection('carBrand')
                        .doc(carBrand[i].id)
                        .collection('carModel')
                        .get()
                        .then((snapshot) => {
                            let carModel = snapshot.docs.map(doc => {
                                const data = doc.data();
                                const id = doc.id;
                                return{id, ...data }
                            })

                            for(let j = 0; j < carModel.length; j++){

                                firestore
                                    .collection('carBrand')
                                    .doc(carBrand[i].id)
                                    .collection('carModel')
                                    .doc(carModel[j].id)
                                    .collection('carVariant')
                                    .get()
                                    .then((snapshot) => {
                                        let carVariant = snapshot.docs.map(doc => {
                                            const data = doc.data();
                                            const id = doc.id;
                                            return{id, ...data }
                                        })

                                        for(let k = 0; k < carVariant.length; k++){
                                            RTC.push({
                                                carBrandId: carBrand[i].id,
                                                carBrandName: carBrand[i].carBrandName,
                                                carBrandUrl: carBrand[i].url,
                                                carModelId: carModel[j].id,
                                                carModelName: carModel[j].carModelName,
                                                carModelUrl: carModel[j].url,
                                                bodyType: carModel[j].bodyType,
                                                carVariantId: carVariant[k].id,
                                                carVariantName: carVariant[k].carVariantName,
                                                price: carVariant[k].price,
                                                femaleClick: carVariant[k].femaleClick,
                                                maleClick: carVariant[k].maleClick,
                                                totalClick: carVariant[k].totalClick
                                            })
                                        }

                                        let sortedRecommendedTopCar = RTC.sort(function (a, b) {
                                            return b.totalClick - a.totalClick;
                                        })

                                        let recommendedTopBrand = [];

                                        for(let l = 0; l < sortedRecommendedTopCar.length; l++){
                                            const found = recommendedTopBrand.some(el => el.carBrandName === sortedRecommendedTopCar[l].carBrandName);
                                            if (!found) recommendedTopBrand.push({ 
                                                carBrandId: sortedRecommendedTopCar[l].carBrandId,
                                                carBrandName: sortedRecommendedTopCar[l].carBrandName,
                                                carBrandUrl: sortedRecommendedTopCar[l].carBrandUrl,
                                            });
                                        }

                                        dispatch({ type: 'RECOMMENDED_TOP_BRAND_STATE_CHANGED', recommendedTopBrand })

                                    }).catch((err) => {
                                        console.error(err)
                                    })

                            }

                        }).catch((err) => {
                            console.error(err)
                        })
                }
            }).catch((err) => {
                console.error(err)
            })
    }
}

export const updateClick = (carInfo) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const gender = getState().firebase.profile.gender;

        let newTotalClickNum = parseInt(carInfo.totalClick) + 1;

        if(gender=="Male"){

            let newMaleClickNum = parseInt(carInfo.maleClick) + 1;
            
            firestore
                .collection('carBrand')
                .doc(carInfo.carBrandId)
                .collection('carModel')
                .doc(carInfo.carModelId)
                .collection('carVariant')
                .doc(carInfo.carVariantId)
                .set(
                    {
                        carVariantName: carInfo.carVariantName,
                        cmId: carInfo.carModelId,
                        price: carInfo.price,
                        maleClick: newMaleClickNum,
                        femaleClick: carInfo.femaleClick,
                        totalClick: newTotalClickNum
                    },
                    { merge: true }
                )
                .then(() => {
                    dispatch({
                        type: 'UPDATE_CLICK_SUCCESS'
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: 'UPDATE_CLICK_ERROR',
                        err
                    });
                });
        } else {
            let newFemaleClickNum = parseInt(carInfo.femaleClick) + 1;
            
            firestore
                .collection('carBrand')
                .doc(carInfo.carBrandId)
                .collection('carModel')
                .doc(carInfo.carModelId)
                .collection('carVariant')
                .doc(carInfo.carVariantId)
                .set(
                    {
                        carVariantName: carInfo.carVariantName,
                        cmId: carInfo.carModelId,
                        price: carInfo.price,
                        maleClick: carInfo.maleClick,
                        femaleClick: newFemaleClickNum,
                        totalClick: newTotalClickNum
                    },
                    { merge: true }
                )
                .then(() => {
                    dispatch({
                        type: 'UPDATE_CLICK_SUCCESS'
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: 'UPDATE_CLICK_ERROR',
                        err
                    });
                });
        }
        
    };
};