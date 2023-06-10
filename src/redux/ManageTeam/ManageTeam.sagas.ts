import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  ADD_TEAM_MEMBER,
  GET_ALL_TEAM_DATA,
  GET_MEMBER_REQUEST,
  REMOVE_TEAM_MEMBER,
  UPDATE_MEMBER_NAME,
  UPDATE_MEMBER_ROLE,
  UPDATE_TEAM_NAME
 } from './ManageTeamActionType';
import { 
  addTeamMemberAPI,
  getMembersAPI,
  getTeamDataApiMAIN,
  getTeamMembersAPI,
  removeTeamMember,
  updateTeamMemberName,
  updateTeamMemberRole,
  updateTeamNameAPI 
} from './ManageTeamApi';
import {
   addTeamMember,
   getAllTeamDataSuccess,
   getAllTeamMembersSuccess,
   getMembersSuccess,
   removeTeamMemberSuccess,
   updateTeamName 
} from './ManageTeamActions';
import { Member } from '../../types/NewSprintTypes';
import { Team } from '../../types/TeamTypes';

export function* getAllTeamDataSaga() {
  try {
    const teams: Team = yield call(getTeamDataApiMAIN);
     yield put(getAllTeamDataSuccess(teams));
  } catch (e) { console.error(e);}
}
export function* updateTeamNameSaga(action: any) {
  try {
    const { teamId, newName } = action.payload;
    yield call(updateTeamNameAPI, teamId, newName);
    yield put(updateTeamName(teamId, newName));
  } catch (e) {
    console.error(e);
  }
}

export function* addTeamMemberSaga(action: any) {
  try {
    const { memberId, email, role, firstName, lastName } = action.payload;
    yield call(addTeamMemberAPI, memberId);
    yield call(addTeamMember, memberId, email, role, firstName, lastName);
  } catch (e) {console.error(e);}
}
export function* removeTeamMemberSaga(action: any) {
  try {
    const { memberId } = action.payload;
    yield call(removeTeamMember, memberId);
    yield put(removeTeamMemberSuccess(memberId));
  }  catch (e) { console.error(e);}
}
  export function* getMembersSaga() {
    try {
      const members: Member[] = yield call(getMembersAPI);
        yield put(getMembersSuccess(members));
    } catch (e) { console.error(e); }
  }
  export function* updateMemberRoleSaga(action: any) {
      try {
        const { memberId, role } = action.payload;
        yield call(updateTeamMemberRole, memberId, role);
        yield put({ type: action.UPDATE_MEMBER_ROLE, payload: { memberId, role } });
      } catch (e) {console.error(e);}
    }
    export function* updateMemberNameSaga(action: any) {
      try {
        const { email, firstName, lastName } = action.payload;
        yield call(updateTeamMemberName, email, firstName, lastName);
        yield put({ type: action.UPDATE_MEMBER_NAME, payload: { email, firstName, lastName } });
      } catch (e) {console.error(e);}
    }

    export function* getAllTeamMembersSaga() {
      try {
        const members: Member[] = yield call(getTeamMembersAPI);
        yield put(getAllTeamMembersSuccess(members));
    
      } catch (e) { console.error(e);}
    }

export default function* newTeamSaga() {
  yield takeLatest(UPDATE_TEAM_NAME, updateTeamNameSaga); 
  yield takeLatest(ADD_TEAM_MEMBER, addTeamMemberSaga); 
  yield takeLatest(REMOVE_TEAM_MEMBER, removeTeamMemberSaga); 
  yield takeLatest(GET_ALL_TEAM_DATA, getAllTeamDataSaga);
  yield takeLatest(GET_MEMBER_REQUEST, getMembersSaga); 
  yield takeLatest(UPDATE_MEMBER_ROLE, updateMemberRoleSaga);
  yield takeLatest(UPDATE_MEMBER_NAME, updateMemberNameSaga);
}