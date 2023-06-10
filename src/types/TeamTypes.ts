import { Role } from "../enums/enums";
import { Member } from "./NewSprintTypes";

export type Team = {
  id: number;
  name: string;
  completedProjects: number;
  completedTasks: number;
  members: Member[];
}

export type TableRowElementProps = {
      row: {
        id: number;
        role: Role; 
        email: string;
        name: string;
        firstName :string;
        lastName :string;
      };
  index: number;
}


