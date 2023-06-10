import { call, put, takeLatest } from 'redux-saga/effects';
import { 
  UPDATE_WORKING_DAY
 } from './WorkingDayActionType';
import { 
  updateWorkingDay
} from './WorkingDayApi';

  export function* updateWorkingDaySaga(action: any) {
      try {
        const { id, taskKeyValue } = action.payload;
        yield call(updateWorkingDay, id, taskKeyValue);
        yield put({ type: action.UPDATE_WORKING_DAY, payload: { id, taskKeyValue } });
      } catch (e) {console.error(e);}
    }

export default function* workingDaySaga() {
  yield takeLatest(UPDATE_WORKING_DAY, updateWorkingDaySaga);
}