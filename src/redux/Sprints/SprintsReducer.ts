import { InitialSprint, Sprint } from '../../types/NewSprintTypes';
import * as actions from './SprintsActionType';

export type SprintState = {
  sprints: (Sprint | InitialSprint)[];
  getSelectedSprint: Sprint | InitialSprint | null;
};

export const initialState: SprintState = {
  sprints: [],
  getSelectedSprint: null,
};

const reducer = (
  state = initialState,
  { type, payload }: { type: string; payload: Sprint[] | Sprint | InitialSprint }
) => {
  switch (type) {
    case actions.GET_SPRINTS_REQUEST:
      return { ...state };
    case actions.GET_SPRINTS_SUCCESS:
      return { ...state, sprints: payload };
    case actions.GET_INITIAL_SELECTED_SPRINT:
      return { ...state, getSelectedSprint: null, getInitialSelectedSprint: payload };
    default:
      return state;
  }
};

export default reducer;
