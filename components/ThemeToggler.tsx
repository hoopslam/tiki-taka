import React from 'react';
import useThemeStore from '../store/themeStore';

const ThemeToggler = () => {
    const { toggleTheme } = useThemeStore();

    return (
        <div
            className='w-14 h-8 bg-gray-200 rounded-full relative dark:bg-emerald-400 transition duration-500 cursor-pointer flex justify-center items-center'
            onClick={toggleTheme}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full absolute top-1 left-1 dark:translate-x-6 transition duration-500`}
            ></div>
        </div>
    );
};

export default ThemeToggler;
