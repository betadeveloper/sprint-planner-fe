import produce from 'immer';
import * as actions from './ManageTeamActionType';
import { Member } from '../../types/NewSprintTypes';

export type MemberTeamState = {
    name: string;
    completedProjects: number| null;
    completedTasks: number| null;
    members: Member[];
};

  export const initialState: {team: MemberTeamState} = { team: { name: '', completedProjects: null, completedTasks: null, members: [] }};

// @ts-ignore
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_ALL_TEAM_DATA_SUCCESS:
      return produce(state, (draftState) => {
        draftState.team = { ...draftState.team, ...payload };
      });
    case actions.UPDATE_TEAM_NAME:
      return produce (state, (draftState) => { draftState.team.name = payload; });
      case actions.GET_ALL_TEAM_MEMBERS_SUCCESS:
        return produce(state, (draftState) => {
          draftState.team.members = [...draftState.team.members, ...payload];
        });
    case actions.ADD_TEAM_MEMBER:
      return produce(state, (draftState) => { draftState.team.members.push(payload); });   
    case actions.REMOVE_TEAM_MEMBER:
       return produce(state, (draftState) => {
         const index = draftState.team.members.findIndex( (member) => member.id === payload);
       draftState.team.members.splice(index, 1);});     
    case actions.UPDATE_TEAM_MEMBER_ROLE:
          return produce(state, (draftState) => {
            const { memberId, role  } = payload;
            const member = draftState.team.members.find(
              (member) => member.id === memberId
            );
            if (member) {
              member.role = role ;
            }
          });
          case actions.GET_MEMBER_REQUEST:
        return {...state };
    case actions.GET_MEMBER_SUCCESS:
         return { ...state, members: payload };
        case actions.UPDATE_MEMBER_ROLE:
      return { ...state, members: state.team.members.map((member) =>
          member.id === payload.memberId ? { ...member, role: payload.newRole }: member ),}; 
   default:
      return state;
  }
};
export default reducer;





