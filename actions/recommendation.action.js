import { forEach } from "lodash";

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