export type UserItems = {
    uuid: string;
    name: string;
    email: string;
    role: string;
    password?: string;
}

export interface TerazzoState {
    userList?: UserItems[];
    setUserList: (data?: UserItems[]) => void;
}