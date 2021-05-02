import { all, takeEvery, call, put } from "redux-saga/effects";
import { FETCH_EVENTS, ADD_COMMENT, ADD_RATE } from "./constants";
import { 
  fetchEventsSuccess,
  fetchEventsFailure,
  addCommentSuccess,
  addCommentFailure,
  addRateSuccess,
  addRateFailure
} from "./actions";
import { getEventsAPI, addCommentAPI, addRateAPI } from "../../api/events/events.api";
import { message } from "antd";
import "antd/dist/antd.css";

function* getEvents(action) {
  try {
    const response = yield call(getEventsAPI, action.payload ? action.payload : "");
    if (response.data) {
      if (response.data.length > 0) {
        yield put(fetchEventsSuccess(response.data))
      } else {
        message.info("There is no events.");
        yield put(fetchEventsSuccess(""))
      }
    } else {
      message.error("There is no events.");
      yield put(fetchEventsSuccess(""))
    }
  } catch (error) {
    message.error("There is no events.");
    yield put(fetchEventsFailure());
  }
}

function* addComment(action) {
  try {
    const response = yield call(addCommentAPI, action.payload ? action.payload : "");
    if (response.data) {
      message.success("Add comment successfully.");
      yield put(addCommentSuccess(response.data));
    } else {
      message.error("Fail to add comment.");
      yield put(addCommentFailure());
    }
  } catch (error) {
    message.error("Fail to add comment.");
    yield put(addCommentFailure());
  }
}

function* addRate(action) {
  try {
    const response = yield call(addRateAPI, action.payload ? action.payload : "");
    if (response.data) {
      message.success("Add rate successfully.");
      yield put(addRateSuccess(response.data));
    } else {
      message.error("Fail to rate this event.");
      yield put(addRateFailure());
    }
  } catch (error) {
    message.error("Fail to rate this event.");
  }
}

export default function* eventsSaga() {
  yield all([
    takeEvery(FETCH_EVENTS, getEvents),
    takeEvery(ADD_COMMENT, addComment),
    takeEvery(ADD_RATE, addRate)
  ]);
}
