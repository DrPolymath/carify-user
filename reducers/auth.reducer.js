import { ToastAndroid } from "react-native";

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
            if(action.err.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
                ToastAndroid.showWithGravity("The user do not exist.", ToastAndroid.SHORT, ToastAndroid.CENTER);
            } else if (action.err.message === "The password is invalid or the user does not have a password.") {
                ToastAndroid.showWithGravity("The password is invalid.", ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
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