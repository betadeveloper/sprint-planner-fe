import { Member, TaskData } from "./NewSprintTypes";

export type MainSprint = {
    sprint: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    tasks: TaskData[];
    members: Member[];
    isHistorical: boolean;
    isActive: boolean;
    };
  };
