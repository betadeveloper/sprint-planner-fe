import * as actions from './WorkingDayActionType';

export const updateWorkingDay = (id: number, taskKeyValue: string) => ({
    type: actions.UPDATE_WORKING_DAY,
    payload: { id, taskKeyValue },
  });