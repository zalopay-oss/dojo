import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { fetchStickySuccess } from "../actions/Notes";
import { database } from "../../firebase/firebase";
import { GET_STICKY, NOTES_UPDATE } from "../../constants/ActionTypes";
import { fetchError } from "../actions/Common";

const getSticky = async () =>
  await database
    .ref("notes")
    .once("value")
    .then((snapshot) => {
      const notess = [];
      snapshot.forEach((rawData) => {
        notess.push(rawData.val());
      });
      return notess;
    })
    .catch((error) => error);

const updateStickyRequest = async ({ notesList }) => {
  await database
    .ref("notes")
    .set(notesList)
    .then((notesList) => notesList)
    .catch((notesList) => notesList);
};

function* fetchStickyRequest() {
  try {
    const fetchedSticky = yield call(getSticky);
    yield put(fetchStickySuccess(fetchedSticky));
  } catch (error) {
    yield put(fetchError(error));
  }
}

export function* fetchSticky() {
  yield takeEvery(GET_STICKY, fetchStickyRequest);
}

export function* updateSticky() {
  yield takeEvery(NOTES_UPDATE, updateStickyRequest);
}

export default function* rootSaga() {
  yield all([fork(fetchSticky), fork(updateSticky)]);
}
