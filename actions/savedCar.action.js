export const addSavedCar = (carInfo,clickInfo) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userId = getState().firebase.auth.uid;
        const gender = getState().firebase.profile.gender;

        firestore
            .collection('users')
            .doc(userId)
            .collection('savedCar')
            .add({
                ...carInfo,
            })
            .then(() => {

                let newTotalClickNum = parseInt(clickInfo.totalClick) + 1;

                if(gender=="Male"){

                    let newMaleClickNum = parseInt(clickInfo.maleClick) + 1;
                    
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
                                femaleClick: clickInfo.femaleClick,
                                totalClick: newTotalClickNum
                            },
                            { merge: true }
                        )
                        .then(() => {
                            console.log("Click updated")
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                } else {
                    let newFemaleClickNum = parseInt(clickInfo.femaleClick) + 1;
                    
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
                                maleClick: clickInfo.maleClick,
                                femaleClick: newFemaleClickNum,
                                totalClick: newTotalClickNum
                            },
                            { merge: true }
                        )
                        .then(() => {
                            console.log("Click updated")
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                }

                dispatch({
                    type: 'ADD_SAVED_CAR_SUCCESS',
                    carInfo
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'ADD_SAVED_CAR_ERROR',
                    err
                });
            });
    };
};

export const removeSavedCar = (carInfo) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userId = getState().firebase.auth.uid;

        firestore
            .collection('users')
            .doc(userId)
            .collection('savedCar')
            .doc(carInfo.id)
            .delete()
            .then(() => {
                dispatch({
                    type: 'REMOVE_SAVED_CAR_SUCCESS',
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'REMOVE_SAVED_CAR_ERROR',
                    err
                });
            });
    };
};