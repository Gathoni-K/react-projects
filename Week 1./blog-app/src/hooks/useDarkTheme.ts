import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useDarkMode() : [Theme, () => void] {
    const [theme, setTheme] =  useState<Theme>(() => {
        const saved = localStorage.getItem('theme') as Theme | null;
        return saved === 'dark' || saved === 'light' ? saved : 'light';
    });
    //the above part checks if there is a saved theme or not

    useEffect(() => {
        const root = window.document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        }
        else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return [theme, toggleTheme];
};
