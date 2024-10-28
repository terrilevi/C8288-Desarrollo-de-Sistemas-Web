export interface UserData {
    name: string;
    age : number;
    email: string;
    description: string;
}

export interface UserState {
    value: UserData;
    hasInfo: boolean;
    hasDescription: boolean;
    isInSafeX: boolean;
}