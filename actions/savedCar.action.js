export const addSavedCar = (carInfo) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const userId = getState().firebase.auth.uid;

        firestore
            .collection('users')
            .doc(userId)
            .collection('savedCar')
            .add({
                ...carInfo,
            })
            .then(() => {
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