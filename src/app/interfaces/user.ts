export interface User {
    id?: number;
    name?: string;
    password?: string;
    icon?: string;
    code?: string;
    token?: string
}

export interface UsersResponse {
userList: User[];
}