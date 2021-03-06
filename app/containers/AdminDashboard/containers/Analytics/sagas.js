import {
  takeLatest,
  fork,
  put,
  cancel,
  take,
  select,
  call
} from "redux-saga/effects";
import { LOCATION_CHANGE, push } from "react-router-redux";

import {
  analyticsFetched,
  analyticsFetchingError,
  analyticsSuccess,
  analyticsFailure
} from "./actions";
import { ANALYTICS_FETCH_REQUEST, ANALYTICS_SETUP_REQUEST } from "./constants";

// import { selectAnalytics } from "./selectors";
import { XcelTrip } from "containers/App/sagas";

function* redirectOnSuccess() {
  const action = yield take(ANALYTICS_SETUP_SUCCESS);
  yield put(push("/admin/dashboard"));
}

function* fetchAnalytics(action) {
  yield call(
    XcelTrip.get(
      "api/configuration/site-analytics",
      analyticsFetched,
      analyticsFetchingError
    )
  );
}

function* setupAnalytics(action) {
  // const successWatcher = yield fork(redirectOnSuccess);
  let id = action.data._id;
  if (id) {
    yield fork(
      XcelTrip.put(
        `api/configuration/site-analytics/${id}`,
        analyticsSuccess,
        analyticsFailure,
        action.data
      )
    );
  } else {
    yield fork(
      XcelTrip.post(
        `api/configuration/site-analytics`,
        analyticsSuccess,
        analyticsFailure,
        action.data
      )
    );
  }

  // yield take([LOCATION_CHANGE, ANALYTICS_SETUP_FAILURE]);
  // yield cancel(successWatcher);
}

function* analyticsWatcher() {
  yield takeLatest(ANALYTICS_FETCH_REQUEST, fetchAnalytics);
  yield takeLatest(ANALYTICS_SETUP_REQUEST, setupAnalytics);
}

export default [analyticsWatcher];
