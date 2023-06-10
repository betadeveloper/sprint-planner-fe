import { get, post } from '../../api';
import { Member, Sprint } from '../../types/NewSprintTypes';

export const createSprint = (sprintData: Sprint) => { post('/sprint', sprintData);};

export const getMembersToSprintAPI = () => { return get<Member[]>("/member");} 