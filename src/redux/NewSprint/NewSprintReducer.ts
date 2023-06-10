import produce from 'immer';
import * as actions from './NewSprintActionType';
import { Member, TaskData } from '../../types/NewSprintTypes';

export type NewSprint = {
  sprint: {
    title: string;
    startDate: string | null;
    endDate: string | null;
    tasks: TaskData[];
    members: Member[];
    businessDays: string[];
    daysOfWeek: string[];
    showNotification: boolean;
    isHistorical: boolean | null;
    isActive: boolean | null;
    numberTasksAdded: Number;
  };
};

export const initialState: NewSprint = {
  sprint: {
    title: '',
    startDate: null,
    endDate: null,
    tasks: [],
    members: [],
    businessDays: [],
    daysOfWeek: [],
    showNotification: true,
    isHistorical: null,
    isActive: null,
    numberTasksAdded: 0,
  },
};

// @ts-ignore
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.ADD_TASK:
      return produce(state, (draftState) => {
        draftState.sprint.tasks.push(payload);
      });
    case actions.REMOVE_TASK:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex((o) => o.id === payload);
        draftState.sprint.tasks.splice(index, 1);
      });
    case actions.UPDATE_START_DATE:
      return produce(state, (draftState) => {
        draftState.sprint.startDate = payload;
      });
    case actions.UPDATE_END_DATE:
      return produce(state, (draftState) => {
        draftState.sprint.endDate = payload;
      });
    case actions.UPDATE_TITLE:
      return produce(state, (draftState) => {
        draftState.sprint.title = payload;
      });
    case actions.UPDATE_TASK_KEY_COLOR:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex((o) => o.id === payload.id);
        console.log(payload);
        draftState.sprint.tasks[index].keyColor = payload.value;
      });
    case actions.UPDATE_TASK_KEY_VALUE:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex((o) => o.id === payload.id);
        draftState.sprint.tasks[index].keyValue = payload.value;
      });
    case actions.UPDATE_TASK_DESCRIPTION:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex((o) => o.id === payload.id);
        draftState.sprint.tasks[index].description = payload.value;
      });
    case actions.UPDATE_TASK_TYPE:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex((o) => o.id === payload.id);
        draftState.sprint.tasks[index].type = payload.value;
      });
    case actions.UPDATE_TASK_OLD_POINTS:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex((o) => o.id === payload.id);
        draftState.sprint.tasks[index].oldPoints = payload.value;
      });
    case actions.UPDATE_TASK_REMAINING_POINTS:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex((o) => o.id === payload.id);
        draftState.sprint.tasks[index].remainingPoints = payload.value;
      });
    case actions.UPDATE_TASK_NEW_POINTS:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex((o) => o.id === payload.id);
        draftState.sprint.tasks[index].newPoints = payload.value;
      });
    case actions.UPDATE_TASK_COLOR:
      return produce(state, (draftState) => {
        const index = state.sprint.tasks.findIndex((o) => o.id === payload.id);
        draftState.sprint.tasks[index].keyColor = payload.value;
      });
    case actions.UPDATE_TASK_ASSIGN:
      return produce(state, (draftState) => {
        const memberIndex = state.sprint.members.findIndex(
          (o) => o.id === payload.person,
        );
        const tasksIndex = state.sprint.members[
          memberIndex
        ].workingDays.findIndex((o) => o.day === payload.day.toString());
        if (payload.value === -1) {
          draftState.sprint.members[memberIndex].workingDays[tasksIndex].task =
            {
              id: -1,
              keyValue: 'Education',
              keyColor: '#878787',
              description: 'Education',
              type: 'Education',
              oldPoints: 0,
              remainingPoints: 0,
              newPoints: 0,
            };
        } else if (payload.value === -2) {
          draftState.sprint.members[memberIndex].workingDays[tasksIndex].task =
            {
              id: -2,
              keyValue: 'Vacation',
              keyColor: '#878787',
              description: 'Vacation',
              type: 'Vacation',
              oldPoints: 0,
              remainingPoints: 0,
              newPoints: 0,
            };
        } else {
          const valueIndex = state.sprint.tasks.findIndex(
            (o) => o.id === payload.value,
          );
          draftState.sprint.members[memberIndex].workingDays[tasksIndex].task =
            draftState.sprint.tasks[valueIndex];
        }
        console.log(Object.values(state.sprint.members || {}));
      });
    case actions.SET_BUSINESS_DAYS: {
      return produce(state, (draftState) => {
        draftState.sprint.businessDays = [...payload];
      });}
    case actions.SET_DAYS_OF_WEEK: {
      return produce(state, (draftState) => {
        draftState.sprint.daysOfWeek = [...payload];
      });}
    case actions.UPDATE_SHOW_NOTIFICATION: {
      return produce(state, (draftState) => {
        draftState.sprint.showNotification = payload;
      });}
    case actions.UPDATE_MEMBERS: {
      return produce(state, (draftState) => {
        const updatedMembers = state.sprint.members.map((member) => {
          const updatedWorkingDays = state.sprint.businessDays.map((day) => ({
            day,
            task: null,
          }));
          return { ...member, workingDays: updatedWorkingDays };
        });
        draftState.sprint.members = [...updatedMembers];
      });}
    case actions.CREATE_NEW_SPRINT_SUCCESS:
      return initialState;
    case actions.CLEAR_NEW_SPRINT_STATE:
      return initialState;
     case actions.ADD_MEMBER_TO_SPRINT_SUCCESS:
      return produce(state, (draftState) => {
        draftState.sprint.members.push(...payload);
      });
      case actions.GET_TASKS_ADDED_COUNT:
        return produce(state, (draftState) => {
          draftState.sprint.numberTasksAdded = state.sprint.tasks.length;
        });

    default:
      return state;
  }
};
export default reducer;