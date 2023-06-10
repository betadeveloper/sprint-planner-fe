import { call, put, takeLatest } from 'redux-saga/effects';
import { ADD_MEMBER_TO_SPRINT_REQUEST, CREATE_NEW_SPRINT } from './NewSprintActionType';
import { createSprint, getMembersToSprintAPI } from './NewSprintApi';
import { createNewSprintSuccess, clearNewSprintState, addMembersToSprintSuccess} from './NewSprintActions';
import { Member } from '../../types/NewSprintTypes';

export function* createSprintSaga(action: any) {
  try {
    yield call(createSprint, action.payload);
    yield put(createNewSprintSuccess());
    yield put(clearNewSprintState());
  } catch (e) { console.error(e); }}

    export function* getAllTeamMembersToSprintSaga() {
    try {
      const members: Member[] = yield call(getMembersToSprintAPI);
      yield put(addMembersToSprintSuccess(members));
    } catch (e) {
      console.error(e);
    }
  }



export default function* newSprintSaga() {
  yield takeLatest(CREATE_NEW_SPRINT, createSprintSaga);
  yield takeLatest(ADD_MEMBER_TO_SPRINT_REQUEST, getAllTeamMembersToSprintSaga);


}
