import { call, put, takeLatest } from 'redux-saga/effects';
import { getInitialSprint } from './InitialSprintApi';
import {
  GET_INITIAL_SPRINT,
  GET_INITIAL_SPRINT_SUCCESS,
  GET_INITIAL_SPRINT_FAILURE,
} from './InitialSprintActionType';
import { InitialSprint } from '../../types/NewSprintTypes';

export function* getInitialSprintSaga(){
  try {
    const initialSprint: InitialSprint[] = yield call(getInitialSprint);
    yield put({
      type: GET_INITIAL_SPRINT_SUCCESS,
      payload: initialSprint,
    });
  } catch (error) {
    yield put({
      type: GET_INITIAL_SPRINT_FAILURE,
      payload: error,
    });
  }
}

export default function* newInitialSprintSaga() {
  yield takeLatest(GET_INITIAL_SPRINT, getInitialSprintSaga);
}
