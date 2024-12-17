import { create } from 'zustand';
import { TerazzoState } from './type';

export const useTerazzo = create<TerazzoState>(
    set => ({
        userList: undefined,
        setUserList: (data) => set(() => ({
            userList: data
        })),
    })
)