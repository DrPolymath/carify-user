export const signIn = (creds) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            creds.email,
            creds.password,
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' })
        })
    }
}

export const signUp = (creds) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const fireBase = getFirebase();
        const firestore = getFirestore();

        fireBase.auth().createUserWithEmailAndPassword(
            creds.email,
            creds.password,
        ).then((res) => {
            return firestore.collection('users').doc(res.user.uid).set({
                username: creds.username,
                email: creds.email,
                password: creds.password,
                birthDate: creds.birthDate,
                gender: creds.gender,
            })
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' })
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
}