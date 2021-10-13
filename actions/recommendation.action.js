export const fetchRecommendedCars = (carBrandID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        firestore
            .collection('carBrand')
            .doc(carBrandID)
            .collection('carModel')
            .get()
            .then((snapshot) => {
                let recommendedCars = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return{id, ...data }
                })
                dispatch({ type: 'RECOMMENDED_CARS_STATE_CHANGED', recommendedCars })
            })
            .catch((err) => {
                console.error(err)
            })
    }
}