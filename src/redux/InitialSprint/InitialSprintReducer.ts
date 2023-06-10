import { Member, TaskData } from '../../types/NewSprintTypes';
import * as actions from './InitialSprintActionType';

export type InitialSprint = {
  initialSprint: object;
  title: string;
  startDate: string | null;
  endDate: string | null;
  tasks: TaskData[];
  memberTeamId: string | null;
  members: Member[];
  isHistorial: boolean | null;
  isActive: boolean | null;
};

const initialState = {
  initialSprint: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_INITIAL_SPRINT:
      return {
        ...state,
        loading: true,
      };
    case actions.GET_INITIAL_SPRINT_SUCCESS:
      return {
        ...state,
        loading: false,
        initialSprint: action.payload,
      };
    case actions.GET_INITIAL_SPRINT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
