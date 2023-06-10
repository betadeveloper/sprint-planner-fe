import { Member, TaskData } from '../../types/NewSprintTypes';
import * as actions from './SprintActionType';

export type Sprint = {
  id: number;
  title: string;
  startDate: string | null;
  endDate: string | null;
  tasks: TaskData[];
  memberTeamId: string | null;
  members: Member[];
  isHistorical: boolean;
  isActive: boolean;
};

const initialState = {
  sprint: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_SPRINT:
      return {
        ...state,
      };
    case actions.GET_SPRINT_SUCCESS:
      return {
        ...state,
        sprint: action.payload,
      };
    case actions.GET_SPRINT_FAILURE:
      return {
        ...state,
      };
      case actions.START_SPRINT_SUCCESS:
        return {
          ...state,
          isActive: true, isHistorical: false,
        };       
      case actions.END_SPRINT_SUCCESS:
        return {
          ...state,
          isActive: false, isHistorical: true,
        };
    default:
      return state;
  }


};
export default reducer;
