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
    CLEAR_EVENTS
} from "./constants";
  
export const fetchEvents = (search) => {
  const action = {
    type: FETCH_EVENTS,
    payload: search
  };

  return action;
};

export const fetchEventsSuccess = (events) => {
  const action = {
    type: FETCH_EVENTS_SUCCESS,
    payload: events
  };

  return action;
};

export const fetchEventsFailure = () => {
  const action = {
    type: FETCH_EVENTS_FAILURE,
    payload: ""
  };

  return action;
};

export const addComment = (comment) => {
  const action = {
    type: ADD_COMMENT,
    payload: comment
  };

  return action;
};

export const addCommentSuccess = (comment) => {
  const action = {
    type: ADD_COMMENT_SUCCESS,
    payload: comment
  };

  return action;
};

export const addCommentFailure = () => {
  const action = {
    type: ADD_COMMENT_FAILURE
  };

  return action;
};

export const addRate = (rate) => {
  const action = {
    type: ADD_RATE,
    payload: rate
  };

  return action;
};

export const addRateSuccess = (rate) => {
  const action = {
    type: ADD_RATE_SUCCESS,
    payload: rate
  };

  return action;
};

export const addRateFailure = () => {
  const action = {
    type: ADD_RATE_FAILURE
  };

  return action;
};

export const addAttendee = (attendee) => {
  const action = {
    type: ADD_ATTENDEE,
    payload: attendee
  };
  return action;
};

export const addAttendeeSuccess = (attendee) => {
  const action = {
    type: ADD_ATTENDEE_SUCCESS,
    payload: attendee
  };
  return action;
};

export const addAttendeeFailure = () => {
  const action = {
    type: ADD_ATTENDEE_FAILURE
  };
  return action;
};

export const addEvent = (obj) => {
  const action = {
    type: ADD_EVENT,
    payload: obj
  };
  return action;
};

export const addEventSuccess = (event) => {
  const action = {
    type: ADD_EVENT_SUCCESS,
    payload: event
  };
  return action;
}

export const addEventFailure = () => {
  const action = {
    type: ADD_EVENT_FAILURE
  };
  return action;
};

export const clearEvents = () => {
  const action = {
    type: CLEAR_EVENTS
  };
  return action;
};