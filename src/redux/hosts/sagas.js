import { all, takeEvery, call, put } from "redux-saga/effects";
import { FETCH_HOSTS, ADD_HOST } from "./constants";
import { fetchHostsSuccess, fetchHostsFailure, addHostSuccess, addHostFailure } from "./actions";
import { getHostsAPI, addHostAPI } from "../../api/hosts/hosts.api";
import { message } from "antd";
import "antd/dist/antd.css";

function* getHosts(action) {
    try {
        const response = yield call(getHostsAPI, action.payload ? action.payload : "");
        if (response.data) {
            yield put(fetchHostsSuccess(response.data));
        } else {
            yield put(fetchHostsSuccess(""));
        }
    } catch(error) {
        message.error("There is no hosts.");
        yield put(fetchHostsFailure());
    }
}

function* addHost(action) {
    try {
        const response = yield call(addHostAPI, action.payload ? action.payload : "");
        if (response.data) {
            yield put(addHostSuccess(response.data));
        } else {
            message.error("Fail to add host.");
            yield put(addHostFailure());
        }
    } catch(error) {
        message.error("Fail to add host.");
        yield put(addHostFailure());
    }
}

export default function* hostsSaga() {
    yield all([
        takeEvery(FETCH_HOSTS, getHosts),
        takeEvery(ADD_HOST, addHost)
    ]);
}
