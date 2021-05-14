import {
    FETCH_HOSTS,
    FETCH_HOSTS_SUCCESS,
    FETCH_HOSTS_FAILURE,
    ADD_HOST,
    ADD_HOST_SUCCESS,
    ADD_HOST_FAILURE,
    CLEAR_NEW_EVENT_ID,
    CLEAR_HOSTS
} from "./constants";

const initState = {
    hosts: "",
    newEventId: "",
    loading: false
};

const hostsReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_HOSTS:
            return {
                ...state,
                loading: true
            };
        case FETCH_HOSTS_SUCCESS:
            return {
                ...state,
                hosts: action.payload,
                loading: false
            };
        case FETCH_HOSTS_FAILURE:
            return {
                ...state,
                hosts: action.payload,
                loading:false
            };
        case ADD_HOST:
            return {
                ...state,
                loading: true
            };
        case ADD_HOST_SUCCESS:
            return {
                ...state,
                hosts: [...state.hosts, action.payload],
                newEventId: action.payload.eventId,
                loading: false
            }
        case ADD_HOST_FAILURE:
            return {
                ...state,
                loading: false
            }
        case CLEAR_NEW_EVENT_ID:
            return {
                ...state,
                newEventId: ""
            }
        case CLEAR_HOSTS:
            return {
                ...state,
                hosts: ""
            };
        default:
            return state;
    }
}

export default hostsReducer;