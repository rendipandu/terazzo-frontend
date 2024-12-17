import { create } from 'zustand';
import { Authstate } from './type';

export const useAuth = create<Authstate>(
    set => ({
        isLogin: false,
        setIsLogin: (isLogin) =>
            set(() => ({
                isLogin,
            })),

        credential: '',
        setCredential: (credential) =>
            set(() => ({
                credential,
            })),
    })
)