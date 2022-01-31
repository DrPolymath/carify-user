export const updateProfile = (profile) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userId = getState().firebase.auth.uid;

        firestore
            .collection('users')
            .doc(userId)
            .set(
                {
                    ...profile,
                    username: profile.username,
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    birthDate: profile.birthDate,
                    phoneNumber: profile.phoneNumber,
                    gender: profile.gender
                },
                { merge: true }
            )
            .then(() => {
                dispatch({
                    type: 'UPDATE_PROFILE_SUCCESS',
                    profile
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'UPDATE_PROFILE_ERROR',
                    err
                });
            });
    };
};

export const updateProfilePicture = (profile) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userId = getState().firebase.auth.uid;

        firestore
            .collection('users')
            .doc(userId)
            .set(
                {
                    url: profile.url,
                },
                { merge: true }
            )
            .then(() => {
                dispatch({
                    type: 'UPDATE_PROFILE_PICTURE_SUCCESS',
                    profile
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'UPDATE_PROFILE_PICTURE_ERROR',
                    err
                });
            });
    };
};

export const saveInterestedCarBrand = (selectedCB) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        let batch = firestore.batch();

        selectedCB.forEach((doc) => {
            batch.set(
                firestore
                    .collection('users')
                    .doc(userId)
                    .collection('interestedCarBrand')
                    .doc(), 
                doc
            )
        });

        batch.commit().then(function () {
            dispatch({ type: 'SAVE_INTERESTED_CAR_BRAND_SUCCESS' })
        }).catch(function (err) {
            dispatch({ type: 'SAVE_INTERESTED_CAR_BRAND_ERROR', err})
        })
    }
}

export const updateInterestedCarBrand = (selectedCarBrands, prevSelectedCarBrands) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        let batch = firestore.batch();

        prevSelectedCarBrands.forEach((doc) => {
            batch.delete(
                firestore
                    .collection('users')
                    .doc(userId)
                    .collection('interestedCarBrand')
                    .doc(doc.interestId)
            )
        });

        selectedCarBrands.forEach((doc) => {
            batch.set(
                firestore
                    .collection('users')
                    .doc(userId)
                    .collection('interestedCarBrand')
                    .doc(), 
                {
                    id: doc.id,
                    carBrandName: doc.carBrandName,
                    url: doc.url,
                }
            )
        });

        batch.commit().then(function () {
            dispatch({ type: 'UPDATE_INTERESTED_CAR_BRAND_SUCCESS' })
        }).catch(function (err) {
            dispatch({ type: 'UPDATE_INTERESTED_CAR_BRAND_ERROR', err})
        })
    }
}

export const fetchInterestedCarBrand = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        firestore
            .collection('users')
            .doc(userId)
            .collection('interestedCarBrand')
            .get()
            .then((snapshot) => {
                let interestedCarBrands = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data }
                })
                dispatch({ type: 'STATE_CHANGED_INTERESTED_CAR_BRAND', interestedCarBrands })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const saveInterestedCarType = (selectedCT) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        let batch = firestore.batch();

        selectedCT.forEach((doc) => {
            batch.set(
                firestore
                    .collection('users')
                    .doc(userId)
                    .collection('interestedCarType')
                    .doc(), 
                doc
            )
        });

        batch.commit().then(function () {
            dispatch({ type: 'SAVE_INTERESTED_CAR_TYPE_SUCCESS' })
        }).catch(function (err) {
            dispatch({ type: 'SAVE_INTERESTED_CAR_TYPE_ERROR', err})
        })
    }
}

export const updateInterestedCarType = (selectedCarTypes, prevselectedCarTypes) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        let batch = firestore.batch();

        prevselectedCarTypes.forEach((doc) => {
            batch.delete(
                firestore
                    .collection('users')
                    .doc(userId)
                    .collection('interestedCarType')
                    .doc(doc.interestId)
            )
        });

        selectedCarTypes.forEach((doc) => {
            batch.set(
                firestore
                    .collection('users')
                    .doc(userId)
                    .collection('interestedCarType')
                    .doc(), 
                {
                    id: doc.id,
                    carTypeName: doc.carTypeName,
                    url: doc.url,
                }
            )
        });

        batch.commit().then(function () {
            dispatch({ type: 'UPDATE_INTERESTED_CAR_TYPE_SUCCESS' })
        }).catch(function (err) {
            dispatch({ type: 'UPDATE_INTERESTED_CAR_TYPE_ERROR', err})
        })
    }
}

export const fetchInterestedCarType = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        firestore
            .collection('users')
            .doc(userId)
            .collection('interestedCarType')
            .get()
            .then((snapshot) => {
                let interestedCarTypes = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data }
                })
                dispatch({ type: 'STATE_CHANGED_INTERESTED_CAR_TYPE', interestedCarTypes })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const saveInterestedPriceRange = (selectedPR) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        let batch = firestore.batch();

        selectedPR.forEach((doc) => {
            batch.set(
                firestore
                    .collection('users')
                    .doc(userId)
                    .collection('interestedPriceRange')
                    .doc(), 
                doc
            )
        });

        batch.commit().then(function () {
            dispatch({ type: 'SAVE_INTERESTED_PRICE_RANGE_SUCCESS' })
        }).catch(function (err) {
            dispatch({ type: 'SAVE_INTERESTED_PRICE_RANGE_ERROR', err})
        })
    }
}

export const updateInterestedPriceRange = (selectedPriceRanges, prevSelectedPriceRanges) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        let batch = firestore.batch();

        prevSelectedPriceRanges.forEach((doc) => {
            batch.delete(
                firestore
                    .collection('users')
                    .doc(userId)
                    .collection('interestedPriceRange')
                    .doc(doc.interestId), 
                doc
            )
        });

        selectedPriceRanges.forEach((doc) => {
            batch.set(
                firestore
                    .collection('users')
                    .doc(userId)
                    .collection('interestedPriceRange')
                    .doc(), 
                {
                    id: doc.id,
                    minPrice: doc.minPrice,
                    maxPrice: doc.maxPrice,
                }
            )
        });

        batch.commit().then(function () {
            dispatch({ type: 'UPDATE_INTERESTED_PRICE_RANGE_SUCCESS' })
        }).catch(function (err) {
            dispatch({ type: 'UPDATE_INTERESTED_PRICE_RANGE_ERROR', err})
        })
    }
}

export const fetchInterestedPriceRange = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        firestore
            .collection('users')
            .doc(userId)
            .collection('interestedPriceRange')
            .get()
            .then((snapshot) => {
                let interestedPriceRanges = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data }
                })
                dispatch({ type: 'STATE_CHANGED_INTERESTED_PRICE_RANGE', interestedPriceRanges })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}