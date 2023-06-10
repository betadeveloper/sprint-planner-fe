import { get, post, put, remove } from "../../api";
import { Role } from "../../enums/enums";
import { Member } from "../../types/NewSprintTypes";
import { Team } from "../../types/TeamTypes";

export const getTeamDataApiMAIN = () => { return get<Team>("/team/1");} 
export const updateTeamNameAPI = (teamId: number, name: String) => { return put(`/${teamId}/update/`,{ name }); };

export const getTeamMembersAPI = () => { return get<Member[]>("/member/team/1");} 

export const addTeamMemberAPI = ( id: number) => { post(`/team/1/member`, {id});} 
export const removeTeamMember = (memberId: number) => { return remove(`/team/1/member/${memberId}`)}; 

export const getMembersAPI = () => { return get<Member[]>("/member") ;} 
export const updateTeamMemberRole = (id: number, role: Role) => { return put(`/member/role`, {id, role }); };
export const updateTeamMemberName = (email: string, firstName: String, lastName: String ) => { return put(`/member/update`, {email, firstName, lastName }); };
