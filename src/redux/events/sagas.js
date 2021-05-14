import { all, takeEvery, call, put } from "redux-saga/effects";
import { FETCH_EVENTS, ADD_COMMENT, ADD_RATE, ADD_ATTENDEE, ADD_EVENT } from "./constants";
import { 
  fetchEventsSuccess,
  fetchEventsFailure,
  addCommentSuccess,
  addCommentFailure,
  addRateSuccess,
  addRateFailure,
  addAttendeeSuccess,
  addAttendeeFailure,
  addEventSuccess,
  addEventFailure,
} from "./actions";
import { addHost } from "../hosts/actions";
import { getEventsAPI, addCommentAPI, addRateAPI, addAttendeeAPI, addEventAPI } from "../../api/events/events.api";
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
    yield put(addRateFailure());
  }
}

function* addAttendee(action) {
  try {
    const response = yield call(addAttendeeAPI, action.payload ? action.payload : "");
    if (response.data) {
      message.success("Join event successfully.");
      yield put(addAttendeeSuccess(response.data));
    } else {
      message.error("Fail to join this event.");
      yield put(addAttendeeFailure());
    }
  } catch (error) {
    message.error("Fail to join this event.");
    yield put(addAttendeeFailure());
  }
}

function* addEvent(action) {
  try {
    const response = yield call(addEventAPI, action.payload.event);
    if (response.data) {
      const event = {...response.data, attendees: [], comments: [], rate: []};
      yield put(addEventSuccess(event));
      const host = {
        eventId: response.data.eventId,
        name: action.payload.user.name,
        email: action.payload.user.email,
        photoUrl: action.payload.user.photoURL
      };
      yield put(addHost(host));
      message.success("Create event successfully.");
    } else {
      message.error("Fail to create event.");
      yield put(addEventFailure());
    }
  } catch (error) {
    message.error("Fail to create event.");
    yield put(addEventFailure());
  }
}

export default function* eventsSaga() {
  yield all([
    takeEvery(FETCH_EVENTS, getEvents),
    takeEvery(ADD_COMMENT, addComment),
    takeEvery(ADD_RATE, addRate),
    takeEvery(ADD_ATTENDEE, addAttendee),
    takeEvery(ADD_EVENT, addEvent)
  ]);
}
