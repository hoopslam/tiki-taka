import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { responseSymbol } from 'next/dist/server/web/spec-compliant/fetch-event';

const authStore = (set: any) => ({
    userProfile: null,
    suggestedUsers: [],

    addUser: (user: any) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),
    fetchSuggestedUsers: async () => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/suggestedUsers`
        );

        set({ suggestedUsers: res.data });
    },
});

const useAuthStore = create(
    persist(authStore, {
        name: 'auth',
    })
);

export default useAuthStore;
