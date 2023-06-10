import * as actions from './SprintActionType';

export const getSprint = (payload: any) => ({
  type: actions.GET_SPRINT,
  payload,
});

export const getSprintSuccess = (payload: any) => ({
  type: actions.GET_SPRINT_SUCCESS,
  payload,
});

export const getSprintFailure = (payload: any) => ({
  type: actions.GET_SPRINT_FAILURE,
  payload,
});

export const startSprint = (id: number) => ({
    type: actions.START_SPRINT,
    payload: {id}
});

export const startSprintSuccess = (id: number) => ({
    type: actions.START_SPRINT_SUCCESS,
    payload: {id}
  });

export const endSprint = (id: number) => ({
   type: actions.END_SPRINT,
    payload: {id}
  });

export const endSprintSuccess = (id: number) => ({
    type: actions.END_SPRINT_SUCCESS,
    payload: {id} 
  });
