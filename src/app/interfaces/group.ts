export interface Group {
        id: number;
        name: string;
        description: string;
        adminId : number;
}

export interface GroupResponse {
    groupList: Group[];
}