import {
    FETCH_EVENTS,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
    ADD_COMMENT,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    ADD_RATE,
    ADD_RATE_SUCCESS,
    ADD_RATE_FAILURE
} from "./constants";
  
const initState = {
  events: "",
  loading: false
};
  
const eventsReducer = (state = initState, action) => {
  let newEvents;
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        loading: true
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        events: action.payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: true
      }
    case ADD_COMMENT_SUCCESS:
      newEvents = [...state.events];
      if (newEvents.length > 0) {
        newEvents[0].comments.push(action.payload);
      }
      return {
        ...state,
        events: newEvents,
        loading: false
      }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        loading: false
      }
    case ADD_RATE:
      return {
        ...state,
        loading: true
      };
    case ADD_RATE_SUCCESS:
      newEvents = [...state.events];
      if (newEvents.length > 0) {
        newEvents[0].rate.push(action.payload);
      }
      return {
        ...state,
        events: newEvents,
        loading: false
      };
    case ADD_RATE_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
  
export default eventsReducer;
  