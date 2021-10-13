const initialState = {
    recommendedCars: [],
};

const recommendationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECOMMENDED_CARS_STATE_CHANGED': {
            console.log('load recommeded car')
            return {
                ...state,
                recommendedCars: action.recommendedCars,
            }
        }
        default: {
            return state
        }
    }
}

export default recommendationReducer;