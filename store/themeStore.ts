import create from 'zustand';
import { persist } from 'zustand/middleware';

const themeStore = (set) => (
    {
        darkMode: false,
        toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
    }
)

const useThemeStore = create(
    persist(themeStore, {
        name: 'theme'
    })
)

export default useThemeStore;