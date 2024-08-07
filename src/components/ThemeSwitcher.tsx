'use client';

import {
    HiOutlineSun as SunIcon,
    HiOutlineMoon as MoonIcon,
} from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    useEffect(() => setMounted(true), []);

    if (!mounted) return <>...</>;

    if (currentTheme === 'dark') {
        return (
            <SunIcon
                className="h-7 w-7 hover:scale-110 duration-200 cursor-pointer"
                onClick={() => setTheme('light')}
            />
        );
    }

    if (currentTheme === 'light') {
        return (
            <MoonIcon
                className="h-6 w-6 text-gray-800 cursor-pointer"
                onClick={() => setTheme('dark')}
            />
        );
    }
}
