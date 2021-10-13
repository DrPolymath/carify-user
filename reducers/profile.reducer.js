const initialState = {
    interestedCarBrands: [],
    interestedCarTypes: [],
    interestedPriceRanges: [],
    saveError: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PROFILE_SUCCESS': {
            console.log("Update success");
            return state;
        }
        case 'UPDATE_PROFILE_ERROR': {
            console.log("Update error");
            return state;
        }
        case 'UPDATE_PROFILE_PICTURE_SUCCESS': {
            console.log("Update picture success");
            return state;
        }
        case 'UPDATE_PROFILE_PICTURE_ERROR': {
            console.log("Update picture error");
            return state;
        }
        case 'SAVE_INTERESTED_CAR_BRAND_SUCCESS': {
            console.log("car brand success");
            return state;
        }
        case 'SAVE_INTERESTED_CAR_BRAND_ERROR': {
            console.log("car brand error");
            return {
                ...state,
                saveError: action.err.message
            }
        }
        case 'UPDATE_INTERESTED_CAR_BRAND_SUCCESS': {
            console.log("car brand success");
            return state;
        }
        case 'UPDATE_INTERESTED_CAR_BRAND_ERROR': {
            console.log("car brand error");
            return {
                ...state,
                saveError: action.err.message
            }
        }
        case 'STATE_CHANGED_INTERESTED_CAR_BRAND': {
            console.log("load car brand");
            return {
                ...state,
                interestedCarBrands: action.interestedCarBrands
            }
        }
        case 'SAVE_INTERESTED_CAR_TYPE_SUCCESS': {
            console.log("car type success");
            return state;
        }
        case 'SAVE_INTERESTED_CAR_TYPE_ERROR': {
            console.log("car type error");
            return {
                ...state,
                saveError: action.err.message
            }
        }
        case 'UPDATE_INTERESTED_CAR_TYPE_SUCCESS': {
            console.log("car type success");
            return state;
        }
        case 'UPDATE_INTERESTED_CAR_TYPE_ERROR': {
            console.log("car type error");
            return {
                ...state,
                saveError: action.err.message
            }
        }
        case 'STATE_CHANGED_INTERESTED_CAR_TYPE': {
            console.log("load car type");
            return {
                ...state,
                interestedCarTypes: action.interestedCarTypes
            }
        }
        case 'SAVE_INTERESTED_PRICE_RANGE_SUCCESS': {
            console.log("price range success");
            return state;
        }
        case 'SAVE_INTERESTED_PRICE_RANGE_ERROR': {
            console.log("price range error");
            return {
                ...state,
                saveError: action.err.message
            }
        }
        case 'UPDATE_INTERESTED_PRICE_RANGE_SUCCESS': {
            console.log("price range success");
            return state;
        }
        case 'UPDATE_INTERESTED_PRICE_RANGE_ERROR': {
            console.log("price range error");
            return {
                ...state,
                saveError: action.err.message
            }
        }
        case 'STATE_CHANGED_INTERESTED_PRICE_RANGE': {
            console.log("load price range");
            return {
                ...state,
                interestedPriceRanges: action.interestedPriceRanges
            }
        }
        default: {
            return state
        }
    }
}

export default profileReducer;