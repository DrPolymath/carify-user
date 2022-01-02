const initialState = {
    recommendedInput: [],
};

const recommendationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECOMMENDED_INPUT_STATE_CHANGED': {
            return {
                ...state,
                recommendedInput: action.recommendedInput,
            }
        }
        default: {
            return state
        }
    }
}

export default recommendationReducer;