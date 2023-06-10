import { call, put, takeLatest } from 'redux-saga/effects';
import { endSprint, getSprint, startSprint } from './SprintApi';
import {
  GET_SPRINT,
  GET_SPRINT_SUCCESS,
  GET_SPRINT_FAILURE,
  START_SPRINT,
  END_SPRINT,
} from './SprintActionType';
import { Sprint } from '../../types/NewSprintTypes';

export function* getSprintSaga(){
  try {
    const sprint: Sprint[] = yield call(getSprint);
    yield put({
      type: GET_SPRINT_SUCCESS,
      payload: sprint,
    });
  } catch (error) {
    yield put({
      type: GET_SPRINT_FAILURE,
      payload: error,
    });
  }
}

export function* startSprintSaga(action: any) {
  try {
    const { id } = action.payload;
    yield call(startSprint, id);
    yield put({ type: action.START_SPRINT_SUCCESS,  payload: { id }  });
  } catch (e) { console.error(e); }
}

export function* endSprintSaga(action: any) {
  try {
    const { id } = action.payload;
    yield call(endSprint, id);
    yield put({ type: action.END_SPRINT_SUCCESS, payload: { id } });
  } catch (e) { console.error(e); }
}


export default function* newSprintSaga() {
  yield takeLatest(GET_SPRINT, getSprintSaga);
  yield takeLatest(START_SPRINT, startSprintSaga);
  yield takeLatest(END_SPRINT, endSprintSaga);
}
