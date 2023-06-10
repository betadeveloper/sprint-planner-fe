import { put } from '../../api';
import { WorkingDay } from '../../types/NewSprintTypes';

export const updateWorkingDay = (id: number, taskKeyValue: String) => { return put(`/workingDay/update`, {id, taskKeyValue }); };

