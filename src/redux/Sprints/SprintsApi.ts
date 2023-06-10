import { get } from '../../api';
import { InitialSprint, Sprint } from '../../types/NewSprintTypes';

export const getSprintsApi = () => {
    return get<Sprint[]>('/sprint');
};

export const getSelectedSprintApi = (id: number) => {
    return get<Sprint>(`/sprint/${id}`);
};

export const getInitialSelectedSprintApi = (id: number) => {
    return get<InitialSprint>(`/sprint/initial/${id}`);
};

