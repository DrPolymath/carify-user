const savedCarReducer = (state = {} , action) => {
    switch (action.type) {
        case 'ADD_SAVED_CAR_SUCCESS': {
            console.log("Add saved car success");
            return state;
        }
        case 'ADD_SAVED_CAR_ERROR': {
            console.log("Add saved car error");
            return state;
        }
        case 'REMOVE_SAVED_CAR_SUCCESS': {
            console.log("Remove saved car success");
            return state;
        }
        case 'REMOVE_SAVED_CAR_ERROR': {
            console.log("Remove saved car error");
            return state;
        }
        default: {
            return state
        }
    }
}

export default savedCarReducer;