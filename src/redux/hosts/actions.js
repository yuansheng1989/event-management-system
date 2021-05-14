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

export const fetchHosts = (search) => {
  const action = {
    type: FETCH_HOSTS,
    payload: search
  };

  return action;
};

export const fetchHostsSuccess = (hosts) => {
  const action = {
    type: FETCH_HOSTS_SUCCESS,
    payload: hosts
  };

  return action;
};

export const fetchHostsFailure = () => {
  const action = {
    type: FETCH_HOSTS_FAILURE,
    payload: ""
  };

  return action;
};

export const addHost = (host) => {
  const action = {
    type: ADD_HOST,
    payload: host
  };

  return action;
}

export const addHostSuccess = (host) => {
  const action = {
    type: ADD_HOST_SUCCESS,
    payload: host
  };

  return action;
}

export const addHostFailure = () => {
  const action = {
    type: ADD_HOST_FAILURE
  };

  return action;
}

export const clearNewEventId = () => {
  const action = {
    type: CLEAR_NEW_EVENT_ID
  };
  return action;
}

export const clearHosts = () => {
  const action = {
    type: CLEAR_HOSTS
  };
  return action;
};