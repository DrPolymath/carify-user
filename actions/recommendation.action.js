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

export const fetchRecommendedForYou = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;

        let recommendedForYou = [];

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

                                        let n = 0;

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

                                                    // let m = 0;

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

                                                                // let sortedRecommendedTopCar = RTC.sort(function (a, b) {
                                                                //     return b.totalClick - a.totalClick;
                                                                // })

                                                                // let recommendedTopCar = sortedRecommendedTopCar.slice(0, 20);

                                                                let rFYBrand = [];
                                                                let rFYType = [];
                                                                let rFYPrice = [];

                                                                for (let index = 0; index < interestedCarBrands.length; index++) {
                                                                    let tempBrand = RTC.filter(e => e.carBrandId == interestedCarBrands[index].id)
                                                                    rFYBrand = [...rFYBrand,...tempBrand]
                                                                }

                                                                for (let index = 0; index < interestedCarTypes.length; index++) {
                                                                    let tempType = RTC.filter(e => e.bodyType == interestedCarTypes[index].carTypeName)
                                                                    rFYType = [...rFYType,...tempType]
                                                                }

                                                                for (let index = 0; index < interestedPriceRanges.length; index++) {
                                                                    let tempRange = RTC.filter(e => parseInt(JSON.stringify(e.price).replace(/\D/g, "")) > parseInt(interestedPriceRanges[index].minPrice) && parseInt(JSON.stringify(e.price).replace(/\D/g, "")) < parseInt(interestedPriceRanges[index].maxPrice))
                                                                    rFYPrice = [...rFYPrice,...tempRange]
                                                                }
                                                                
                                                                recommendedForYou = [...rFYBrand,...rFYType, ...rFYPrice]

                                                                recommendedForYou = recommendedForYou.filter( (ele, ind) => ind === recommendedForYou.findIndex( elem => elem.carVariantId === ele.carVariantId))
                                                                // console.log(interestedCarTypes)
                                                                // console.log(interestedPriceRanges)
                                                                // console.log(RTC)
                                                                // console.log(RTC.length)
                                                                if(RTC.length == 31){
                                                                    // console.log("masukbearapa")
                                                                    dispatch({ type: 'RECOMMENDED_FOR_YOU_STATE_CHANGED', recommendedForYou })
                                                                }

                                                                // console.log("seleng")
                                                                // console.log(n)
                                                                // console.log(m)
                                                                // console.log(carBrand.length)
                                                                // console.log(carModel.length)

                                                                n++;
                                                            }).catch((err) => {
                                                                console.error(err)
                                                            })

                                                    }
                                                    // n++;
                                                }).catch((err) => {
                                                    console.error(err)
                                                })
                                        }
                                    }).catch((err) => {
                                        console.error(err)
                                    })

                            })
                            .catch((error) => {
                                console.log(error)
                            })
                        
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
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

                let n = 0;

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

                            let m = 0;

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

                                        console.log(RTC.length)
                                        if(RTC.length == 31){
                                            // console.log("dsgfsdgsd")
                                            dispatch({ type: 'RECOMMENDED_TOP_CAR_STATE_CHANGED', recommendedTopCar })
                                        }
                                        // console.log("seleng")
                                        // console.log(n)
                                        // console.log(m)
                                        // console.log(carBrand.length)
                                        // console.log(carModel.length)
                                        m++;
                                    }).catch((err) => {
                                        console.error(err)
                                    })
                            }
                            n++;
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

                let n = 0;

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

                            // let j;
                            let m = 0

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

                                        // let sortedRecommendedTopCar = RTC.sort(function (a, b) {
                                        //     return b.totalClick - a.totalClick;
                                        // })

                                        let recommendedTopBrand = [];

                                        RTC.reduce(function (res, value) {
                                            if (!res[value.carBrandId]) {
                                                res[value.carBrandId] = {
                                                    carBrandName: value.carBrandName,
                                                    totalClick: 0,
                                                    maleClick: 0,
                                                    femaleClick: 0,
                                                    carBrandId: value.carBrandId,
                                                };
                                              recommendedTopBrand.push(res[value.carBrandId]);
                                            }
                                            res[value.carBrandId].totalClick += value.totalClick;
                                            res[value.carBrandId].maleClick += value.maleClick;
                                            res[value.carBrandId].femaleClick += value.femaleClick;
                                            return res;
                                        }, {});
                                      
                                        recommendedTopBrand = recommendedTopBrand
                                            .sort(function (a, b) {
                                            return b.totalClick - a.totalClick;
                                        }).map((item) => {
                                            return {
                                              ...item,
                                              carBrandUrl: carBrand.find((o) => o.id === item.carBrandId).url,
                                            };
                                        });

                                        // for(let l = 0; l < sortedRecommendedTopCar.length; l++){
                                        //     const found = recommendedTopBrand.some(el => el.carBrandName === sortedRecommendedTopCar[l].carBrandName);
                                        //     if (!found) recommendedTopBrand.push({ 
                                        //         carBrandId: sortedRecommendedTopCar[l].carBrandId,
                                        //         carBrandName: sortedRecommendedTopCar[l].carBrandName,
                                        //         carBrandUrl: sortedRecommendedTopCar[l].carBrandUrl,
                                        //     });
                                        // }

                                        if(RTC.length == 31){
                                            // console.log("dsgfsdgsdghdhdhdfhfd")
                                            dispatch({ type: 'RECOMMENDED_TOP_BRAND_STATE_CHANGED', recommendedTopBrand })
                                        }
                                        
                                        m++;
                                    }).catch((err) => {
                                        console.error(err)
                                    })
                            }
                            n++;
                        }).catch((err) => {
                            console.error(err)
                        })
                }
            }).catch((err) => {
                console.error(err)
            })
    }
}

export const fetchRandomCar = () => {
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

                                        let sortedRecommendedTopCar = RTC.sort(() => 0.5 - Math.random());

                                        let recommendedRandomCar = sortedRecommendedTopCar.slice(0, 10);

                                        if(RTC.length == 31){
                                            // console.log("dsgfsdgsd")
                                            dispatch({ type: 'RECOMMENDED_RANDOM_CAR_STATE_CHANGED', recommendedRandomCar })
                                        }
                                        // console.log("seleng")
                                        // console.log(n)
                                        // console.log(m)
                                        // console.log(carBrand.length)
                                        // console.log(carModel.length)
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

export const updateClick = (carBrand,carModel,carVariant) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const gender = getState().firebase.profile.gender;

        let latestClickInfo;

        firestore
            .collection('carBrand')
            .doc(carBrand)
            .collection('carModel')
            .doc(carModel)
            .collection('carVariant')
            .doc(carVariant)
            .get()
            .then((doc) =>{
                latestClickInfo = doc.data()
            })
            .catch((err) => {
                console.log(err)
            });

        let newTotalClickNum = parseInt(latestClickInfo.totalClick) + 1;

        if(gender=="Male"){

            let newMaleClickNum = parseInt(latestClickInfo.maleClick) + 1;
            
            firestore
                .collection('carBrand')
                .doc(carBrand)
                .collection('carModel')
                .doc(carModel)
                .collection('carVariant')
                .doc(carVariant)
                .set(
                    {
                        carVariantName: latestClickInfo.carVariantName,
                        cmId: latestClickInfo.carModelId,
                        price: latestClickInfo.price,
                        maleClick: newMaleClickNum,
                        femaleClick: latestClickInfo.femaleClick,
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
            let newFemaleClickNum = parseInt(latestClickInfo.femaleClick) + 1;
            
            firestore
                .collection('carBrand')
                .doc(carBrand)
                .collection('carModel')
                .doc(carModel)
                .collection('carVariant')
                .doc(carVariant)
                .set(
                    {
                        carVariantName: latestClickInfo.carVariantName,
                        cmId: latestClickInfo.carModelId,
                        price: latestClickInfo.price,
                        maleClick: latestClickInfo.maleClick,
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