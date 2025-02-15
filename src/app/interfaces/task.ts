export interface Task {
        id?: number;
        title?: string;
        location?: string;
        description?: string;
        status?: string;
        author?: number;
        hour?: Date;
        authorId? : number;
}

export interface TaskResponse {
    taskList: Task[];
}