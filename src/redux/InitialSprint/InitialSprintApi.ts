import { get } from '../../api';

export const getInitialSprint = () => {return get(`/sprint/initial/active`)};
