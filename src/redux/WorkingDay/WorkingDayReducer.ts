import { Member, TaskData, WorkingDay } from '../../types/NewSprintTypes';
import * as actions from './WorkingDayActionType';

export type Sprint = {
  sprint: {
    title: string;
    startDate: string | null;
    endDate: string | null;
    tasks: TaskData[];
    members: Member[];
    workingDays: WorkingDay[]; 
    daysOfWeek: string[];
    showNotification: boolean;
    isHistorical: boolean | null;
    isActive: boolean | null;
  };
};

export const initialState: Sprint = {
  sprint: {
    title: '',
    startDate: null,
    endDate: null,
    tasks: [],
    members: [],
    workingDays: [],
    daysOfWeek: [],
    showNotification: true,
    isHistorical: null,
    isActive: null,
  },
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.UPDATE_WORKING_DAY:
      const { id, taskKeyValue } = action.payload;
      const updatedWorkingDays = state.sprint.workingDays.map((day) => { 
        if (day.id === id) {
          return { ...day, task: { id, keyValue: taskKeyValue } };
        }
        return day;
      });
      return { ...state, sprint: { ...state.sprint, workingDays: updatedWorkingDays } };
    default:
      return state;
  }
};

export default reducer;