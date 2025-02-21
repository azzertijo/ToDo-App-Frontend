export interface Task {
        id?: number;
        title?: string;
        location?: string;
        description?: string;
        status?: string;
        authorId?: number;
        hour?: Date;
        doneById? : number;
}

export interface TaskResponse {
    tasks: Task[];
}