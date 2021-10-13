import { firebaseReducer } from "react-redux-firebase";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import authReducer from "./auth.reducer";
import profileReducer from "./profile.reducer";
import recommendationReducer from "./recommendation.reducer";
import savedCarReducer from "./savedCar.reducer";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    profile: profileReducer,
    recommendation: recommendationReducer,
    savedCar: savedCarReducer,
})

export default rootReducer;