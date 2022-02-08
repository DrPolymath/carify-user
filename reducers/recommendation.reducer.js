const initialState = {
    recommendedInput: [],
    recommendedForYou:[],
    recommendedTopCar:[],
    recommendedTopBrand:[],
    recommendedRandomCar:[],
};

const recommendationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECOMMENDED_INPUT_STATE_CHANGED': {
            return {
                ...state,
                recommendedInput: action.recommendedInput,
            }
        }
        case 'RECOMMENDED_FOR_YOU_STATE_CHANGED': {
            return {
                ...state,
                recommendedForYou: action.recommendedForYou,
            }
        }
        case 'RECOMMENDED_TOP_CAR_STATE_CHANGED': {
            return {
                ...state,
                recommendedTopCar: action.recommendedTopCar,
            }
        }
        case 'RECOMMENDED_TOP_BRAND_STATE_CHANGED': {
            return {
                ...state,
                recommendedTopBrand: action.recommendedTopBrand,
            }
        }
        case 'RECOMMENDED_RANDOM_CAR_STATE_CHANGED': {
            return {
                ...state,
                recommendedRandomCar: action.recommendedRandomCar,
            }
        }
        case 'UPDATE_CLICK_SUCCESS': {
            return state
        }
        case 'UPDATE_CLICK_ERROR': {
            console.log("Update click error")
            return state
        }
        default: {
            return state
        }
    }
}

export default recommendationReducer;