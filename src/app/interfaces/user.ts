export interface User {
    id?: number;
    name?: string;
    password?: string;
    icon?: string;
    code?: string;
}

export interface UsersResponse {
userList: User[];
}