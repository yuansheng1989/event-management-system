import { all, takeEvery, call, put } from "redux-saga/effects";
import { FETCH_HOSTS } from "./constants";
import { fetchHostsSuccess, fetchHostsFailure } from "./actions";
import { getHostsAPI } from "../../api/hosts/hosts.api";
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

export default function* hostsSaga() {
    yield all([takeEvery(FETCH_HOSTS, getHosts)]);
}
