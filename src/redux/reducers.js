import { combineReducers } from "redux";
import EventsReducer from "./events/reducer";
import HostsReducer from "./hosts/reducer";
import AuthReducer from "./auth/reducer";
import LayoutReducer from "./layout/reducer";

const reducers = combineReducers({ EventsReducer, HostsReducer, AuthReducer, LayoutReducer });

export default reducers;