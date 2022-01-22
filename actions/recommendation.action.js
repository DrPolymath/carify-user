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