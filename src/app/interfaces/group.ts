import { Task } from "./task";
import { User } from "./user";

export interface Group {
        id: number;
        name: string;
        description: string;
        adminId : number;
}

export interface GroupResponse {
    groupList: Group[];
    members: User[];
    tasks: Task[];
}