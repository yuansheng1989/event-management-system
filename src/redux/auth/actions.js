import firebase from '../../config/firebase';
import { message } from 'antd';

import {
    SIGN_UP_USER_STARTED,
    SIGN_UP_USER_SUCCESS,
    SIGN_UP_USER_FAILURE,
    LOGIN_USER_STARTED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGIN_GOOGLE_USER_STARTED,
    LOGIN_GOOGLE_USER_SUCCESS,
    LOGIN_GOOGLE_USER_FAILURE,
    LOGOUT_STARTED,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    UPDATE_AUTH,
    TOGGLE_AUTH_MODAL
} from './constants';

export const signUpUser = (email, password, username) => {
    return async (dispatch) => {
        try {
            dispatch(signUpUserStarted());
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            await user.updateProfile({
                displayName: username
            });
            const token = await user.getIdToken();
            localStorage.setItem("token", token);
            const userData = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            };
            localStorage.setItem("user", JSON.stringify(userData));
            dispatch(signUpUserSuccess(userData));
        }
        catch(error) {
            message.error(error.message);
            dispatch(signUpUserFailure());
        }
    }
}

const signUpUserStarted = () => {
    const action = {
        type: SIGN_UP_USER_STARTED
    };
    return action;
};

const signUpUserSuccess = (user) => {
    const action = {
        type: SIGN_UP_USER_SUCCESS,
        payload: user
    }
    return action;
};

const signUpUserFailure = () => {
    const action = {
        type: SIGN_UP_USER_FAILURE
    };
    return action;
}

export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(loginUserStarted());
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            localStorage.setItem("token", token);
            const userData = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            };
            localStorage.setItem("user", JSON.stringify(userData));
            dispatch(loginUserSuccess(userData));
        }
        catch (error) {
            message.error(error.message);
            dispatch(loginUserFailure());
        }
    }
}

const loginUserStarted = () => {
    const action = {
        type: LOGIN_USER_STARTED
    };
    return action;
}

const loginUserSuccess = (user) => {
    const action = {
        type: LOGIN_USER_SUCCESS,
        payload: user
    };
    return action;
}

const loginUserFailure = () => {
    const action = {
        type: LOGIN_USER_FAILURE
    }
    return action;
}

export const loginGoogleUser = () => {
    return async (dispatch) => {
        try {
            dispatch(loginGoogleUserStarted());
            const provider = new firebase.auth.GoogleAuthProvider();
            const result = await firebase.auth().signInWithPopup(provider);
            const user = result.user;
            const token = await user.getIdToken();
            localStorage.setItem("token", token);
            const userData = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            };
            localStorage.setItem("user", JSON.stringify(userData));
            dispatch(loginGoogleUserSuccess(userData));
        }
        catch (error) {
            message.error(error.message);
            dispatch(loginGoogleUserFailure());
        }
    }
}

const loginGoogleUserStarted = () => {
    const action = {
        type: LOGIN_GOOGLE_USER_STARTED
    }
    return action;
}

const loginGoogleUserSuccess = (user) => {
    const action = {
        type: LOGIN_GOOGLE_USER_SUCCESS,
        payload: user
    };
    return action;
}

const loginGoogleUserFailure = () => {
    const action = {
        type: LOGIN_GOOGLE_USER_FAILURE
    };
    return action;
}

export const logout = () => {
    return async (dispatch) => {
        try {
            dispatch(logoutStarted());
            await firebase.auth().signOut();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch(logoutSuccess());
        }
        catch (error) {
            message.error(error.message);
            dispatch(logoutFailure());
        }
    }
}

const logoutStarted = () => {
    const action = {
        type: LOGOUT_STARTED
    };
    return action;
}

const logoutSuccess = () => {
    const action = {
        type: LOGOUT_SUCCESS
    };
    return action;
}

const logoutFailure = () => {
    const action = {
        type: LOGOUT_FAILURE
    };
    return action;
}

export const updateAuth = (user) => {
    const action = {
        type: UPDATE_AUTH,
        payload: user
    };
    return action;
};

export const toggleAuthModal = ({isAuthModalVisible, authModalType}) => {
    const action = {
        type: TOGGLE_AUTH_MODAL,
        payload: {isAuthModalVisible, authModalType}
    };
    return action;
}