import { get, put } from '../../api';
export const getSprint = () => {return get(`/sprint/active`)};

export const startSprint = (id: number) => { return put(`/sprint/${id}/active`);};
export const endSprint = (id: number) => { return put(`/sprint/${id}/historical`);};