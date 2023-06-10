import * as actions from './InitialSprintActionType';

export const getInitialSprint = (payload: any) => ({
  type: actions.GET_INITIAL_SPRINT,
  payload,
});

export const getInitialSprintSuccess = (payload: any) => ({
  type: actions.GET_INITIAL_SPRINT_SUCCESS,
  payload,
});

export const getInitialSprintFailure = (payload: any) => ({
  type: actions.GET_INITIAL_SPRINT_FAILURE,
  payload,
});
