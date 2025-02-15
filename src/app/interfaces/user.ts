export interface User {
    id: number;
    name: string;
    password: string;
    adminId : number;
}

export interface UsersResponse {
userList: User[];
}