import { Role } from '../enums/enums';

export type Sprint = {
  [id: string]: any;
  title: string;
  startDate: string;
  endDate: string;
  tasks: TaskData[];
  members: Member[];
  isHistorial: boolean | null;
  isActive: boolean | null;
};

export type InitialSprint = {
  [id: string]: any;
  title: string;
  startDate: string;
  endDate: string;
  tasks: TaskData[];
  members: Member[];
  isHistorial: boolean | null;
  isActive: boolean | null;
};

export type Task = {
  keyValue: string;
  keyColor: string;
  description: string;
  type: string;
  oldPoints: number;
  remainingPoints: number;
  newPoints: number;
};

export type MemberWorkingDay = {
  day: string;
  task: TaskData | null;
};

export type Member = {
  firstName: string;
  lastName: string;
  email: string;
  workingDays: MemberWorkingDay[];
  id: number;
  name: string;
  role: Role;
};

export type WorkingDay = {
  id: number;
  taskKeyValue: string;
};

export type TaskData = {
  id: number;
  keyValue: string;
  keyColor: string;
  description: string;
  type: string;
  oldPoints: number;
  remainingPoints: number;
  newPoints: number;
};
