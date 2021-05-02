import { combineReducers } from "redux";
import EventsReducer from "./events/reducer";
import HostsReducer from "./hosts/reducer";
import AuthReducer from "./auth/reducer";

const reducers = combineReducers({ EventsReducer, HostsReducer, AuthReducer });

export default reducers;