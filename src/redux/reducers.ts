import { combineReducers } from 'redux';
import newSprintReducer from './NewSprint/NewSprintReducer';
import ManageTeamReducer from './ManageTeam/ManageTeamReducer';
import SprintReducer from './Sprint/SprintReducer';
import InitialSprintReducer from './InitialSprint/InitialSprintReducer';
import SprintsReducer from './Sprints/SprintsReducer';
import workingDayReducer from './WorkingDay/WorkingDayReducer';

const reducers = combineReducers({
  newSprint: newSprintReducer,
  manageTeam: ManageTeamReducer,
  sprint: SprintReducer,
  initialSprint: InitialSprintReducer,
  workingDay: workingDayReducer,
  sprints: SprintsReducer
});

export default reducers;
