import {
  FETCH_EVENTS,
  FETCH_EVENTS_SUCCESS,
  FETCH_EVENTS_FAILURE,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_RATE,
  ADD_RATE_SUCCESS,
  ADD_RATE_FAILURE,
  ADD_ATTENDEE,
  ADD_ATTENDEE_SUCCESS,
  ADD_ATTENDEE_FAILURE,
  ADD_EVENT,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE,
  CLEAR_EVENTS,
  EDIT_EVENT,
  EDIT_EVENT_SUCCESS,
  EDIT_EVENT_FAILURE,
  CLEAR_EDIT_EVENT_ID
} from "./constants";

const initState = {
  events: "",
  editEventId: "",
  loading: false,
};

const eventsReducer = (state = initState, action) => {
  let newEvents;
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };
    case FETCH_EVENTS_FAILURE:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        loading: true,
      };
    case ADD_COMMENT_SUCCESS:
      newEvents = [...state.events];
      if (newEvents.length > 0) {
        newEvents[0].comments.push(action.payload);
      }
      return {
        ...state,
        events: newEvents,
        loading: false,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case ADD_RATE:
      return {
        ...state,
        loading: true,
      };
    case ADD_RATE_SUCCESS:
      newEvents = [...state.events];
      if (newEvents.length > 0) {
        newEvents[0].rate.push(action.payload);
      }
      return {
        ...state,
        events: newEvents,
        loading: false,
      };
    case ADD_RATE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case ADD_ATTENDEE:
      return {
        ...state,
        loading: true,
      };
    case ADD_ATTENDEE_SUCCESS:
      newEvents = [...state.events];
      if (newEvents.length > 0) {
        newEvents[0].attendees.push(action.payload);
      }
      return {
        ...state,
        events: newEvents,
        loading: false,
      };
    case ADD_ATTENDEE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case ADD_EVENT:
      return {
        ...state,
        loading: true,
      };
    case ADD_EVENT_SUCCESS:
      newEvents = [...state.events, action.payload];
      return {
        ...state,
        events: newEvents,
        loading: false,
      };
    case ADD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        events: ""
      };
    case EDIT_EVENT:
      return {
        ...state,
        loading: true
      };
    case EDIT_EVENT_SUCCESS:
      newEvents = [action.payload];
      return {
        events: newEvents,
        editEventId: action.payload.eventId,
        loading: false,
      };
    case EDIT_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_EDIT_EVENT_ID:
      return {
        ...state,
        editEventId: ""
      };
    default:
      return state;
  }
};

export default eventsReducer;
