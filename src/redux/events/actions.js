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