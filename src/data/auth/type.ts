export interface Authstate {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;

    credential: string;
    setCredential: (credential: string) => void;
}