const initialState = {
    authError: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': {
            console.log("success");
            return {
                ...state,
                authError: null
            }
        }
        case 'LOGIN_ERROR': {
            console.log("error");
            return {
                ...state,
                authError: action.err.message
            }
        }
        case 'SIGNUP_SUCCESS': {
            console.log("success");
            return {
                ...state,
                authError: null
            }
        }
        case 'SIGNUP_ERROR': {
            console.log("error");
            return {
                ...state,
                authError: action.err.message
            }
        }
        case 'SIGNOUT_SUCCESS': {
            console.log("success");
            return {
                ...state,
                interestedCarBrands: [],
                interestedCarTypes: [],
                interestedPriceRanges: [],
                saveError: null
            }
        }
        default: {
            return state
        }
            
            
    }
}

export default authReducer;