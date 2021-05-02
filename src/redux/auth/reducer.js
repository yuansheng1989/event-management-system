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

const initState = {
    isLoggingIn: false,
    isGoolgeLoggingIn: false,
    isSigningUp: false,
    isLoggingOut: false,
    loading: false,
    isAuthenticated: false,
    isLoginError: false,
    isGoogleLoginError: false,
    isSignUpError: false,
    isLogoutError: false,
    user: {},
    isAuthModalVisible: false,
    authModalType: ""
};

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case SIGN_UP_USER_STARTED:
            return {
                ...state,
                loading: true,
                isSigningUp: true
            };
        case SIGN_UP_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isSigningUp: false,
                isAuthenticated: true,
                isSignUpError: false,
                user: action.payload
            };
        case SIGN_UP_USER_FAILURE:
            return {
                ...state,
                loading: false,
                isSigningUp: false,
                isSignUpError: true
            };
        case LOGIN_USER_STARTED:
            return {
                ...state,
                loading: true,
                isLoggingIn: true
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggingIn: false,
                isAuthenticated: true,
                isLoginError: false,
                user: action.payload
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggingIn: false,
                isLoginError: true
            };
        case LOGIN_GOOGLE_USER_STARTED:
            return {
                ...state,
                loading: true,
                isGoolgeLoggingIn: true
            };
        case LOGIN_GOOGLE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isGoolgeLoggingIn: false,
                isAuthenticated: true,
                isGoogleLoginError: false,
                user: action.payload
            };
        case LOGIN_GOOGLE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                isGoolgeLoggingIn: false,
                isGoogleLoginError: true
            };
        case LOGOUT_STARTED:
            return {
                ...state,
                loading: true,
                isLoggingOut: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggingOut: false,
                isAuthenticated: false,
                isLogoutError: false,
                user: {}
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggingOut: false,
                isLogoutError: true
            };
        case UPDATE_AUTH:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case TOGGLE_AUTH_MODAL:
            return {
                ...state,
                isAuthModalVisible: action.payload.isAuthModalVisible,
                authModalType: action.payload.authModalType
            };
        default:
            return state;
    }
};

export default AuthReducer;