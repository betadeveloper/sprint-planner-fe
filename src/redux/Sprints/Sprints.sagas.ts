import { call, put, takeLatest } from 'redux-saga/effects';
import { getInitialSelectedSprintApi, getSelectedSprintApi, getSprintsApi } from './SprintsApi';
import { GET_INITIAL_SELECTED_SPRINT, GET_SELECTED_SPRINT, GET_SPRINTS_REQUEST } from './SprintsActionType';
import { getSprintsSuccess } from './SprintsActions';
import { InitialSprint, Sprint } from '../../types/NewSprintTypes';
import { getSprintSuccess } from '../Sprint/SprintActions';
import { getInitialSprintSuccess } from '../InitialSprint/InitialSprintActions';

export function* getSprintsSaga() {
    try {
        const sprints: Sprint[] = yield call(getSprintsApi);
        yield put(getSprintsSuccess(sprints));
    } catch (error) { console.error(error) };
}

export function* getSelectedSprintSaga(action: { type: number, payload: number }) {
    try {
        const sprint: Sprint = yield call(getSelectedSprintApi, action.payload);
        yield put(getSprintSuccess(sprint));
    } catch (error) { console.error(error) }
}

export function* getInitialSelectedSprintSaga(action: { type: number, payload: number }) {
    try {
        const initialSprint: InitialSprint = yield call(getInitialSelectedSprintApi, action.payload);
        yield put(getInitialSprintSuccess(initialSprint));
    } catch (error) { console.error(error) }
}

export default function* newSprintsSaga() {
    yield takeLatest(GET_SPRINTS_REQUEST, getSprintsSaga);
    yield takeLatest(GET_SELECTED_SPRINT, getSelectedSprintSaga);
    yield takeLatest(GET_INITIAL_SELECTED_SPRINT, getInitialSelectedSprintSaga);
}