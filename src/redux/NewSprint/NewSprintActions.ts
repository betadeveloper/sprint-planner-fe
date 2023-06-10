import * as actions from './NewSprintActionType';
import { Member, TaskData } from '../../types/NewSprintTypes';
import { Dayjs } from 'dayjs';

export const addTask = (task: TaskData) => ({
  type: actions.ADD_TASK,
  payload: task,
});

export const removeTask = (id: number) => ({
  type: actions.REMOVE_TASK,
  payload: id,
});

export const updateStartDate = (startDate: Dayjs | null) => ({
  type: actions.UPDATE_START_DATE,
  payload: startDate ? startDate.toISOString() : null,
});

export const updateEndDate = (endDate: Dayjs | null) => ({
  type: actions.UPDATE_END_DATE,
  payload: endDate ? endDate.toISOString() : null,
});

export const updateTitle = (title: string) => ({
  type: actions.UPDATE_TITLE,
  payload: title,
});

export const updateTaskKeyColor = (id: number, value: string) => ({
  type: actions.UPDATE_TASK_KEY_COLOR,
  payload: { id, value },
});

export const updateTaskKeyValue = (id: number, value: string) => ({
  type: actions.UPDATE_TASK_KEY_VALUE,
  payload: { id, value },
});

export const updateTaskColor = (id: number, value: string) => ({
  type: actions.UPDATE_TASK_COLOR,
  payload: { id, value },
});

export const updateTaskDescription = (id: number, value: string) => ({
  type: actions.UPDATE_TASK_DESCRIPTION,
  payload: { id, value },
});

export const updateTaskType = (id: number, value: string) => ({
  type: actions.UPDATE_TASK_TYPE,
  payload: { id, value },
});

export const updateTaskOldPoints = (id: number, value: number) => ({
  type: actions.UPDATE_TASK_OLD_POINTS,
  payload: { id, value },
});

export const updateTaskRemainingPoints = (id: number, value: number) => ({
  type: actions.UPDATE_TASK_REMAINING_POINTS,
  payload: { id, value },
});

export const updateTaskNewPoints = (id: number, value: number) => ({
  type: actions.UPDATE_TASK_NEW_POINTS,
  payload: { id, value },
});

export const createNewSprint = (sprintData: any) => ({
  type: actions.CREATE_NEW_SPRINT,
  payload: sprintData,
});

export const updateTaskAssign = (
  person: number,
  day: string | null,
  value: number,
) => ({
  type: actions.UPDATE_TASK_ASSIGN,
  payload: { person, day, value },
});

export const setBusinessDays = (businessDays: string[]) => ({
  type: actions.SET_BUSINESS_DAYS,
  payload: businessDays,
});

export const setDaysOfWeek = (daysOfWeek: string[]) => ({
  type: actions.SET_DAYS_OF_WEEK,
  payload: daysOfWeek,
});

export const updateShowNotification = (showNotification: boolean) => ({
  type: actions.UPDATE_SHOW_NOTIFICATION,
  payload: showNotification,
});

export const updateMembers = () => ({
  type: actions.UPDATE_MEMBERS,
});

export const createNewSprintSuccess = () => ({
  type: actions.CREATE_NEW_SPRINT_SUCCESS,
});

export const clearNewSprintState = () => ({
  type: actions.CLEAR_NEW_SPRINT_STATE,
});

export const addMembersToSprint = () => ({
  type: actions.ADD_MEMBER_TO_SPRINT_REQUEST,
});
export const addMembersToSprintSuccess = (members: Member[]) => ({
  type: actions.ADD_MEMBER_TO_SPRINT_SUCCESS,
  payload: members,
});

export const getTasksAddedCount = () => {
  return {
    type: actions.GET_TASKS_ADDED_COUNT,
  };
};