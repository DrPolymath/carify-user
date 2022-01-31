const initialState = {
    recommendedInput: [],
    recommendedTopCar:[],
    recommendedTopBrand:[],
};

const recommendationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECOMMENDED_INPUT_STATE_CHANGED': {
            return {
                ...state,
                recommendedInput: action.recommendedInput,
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