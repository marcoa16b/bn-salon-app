'use client';

import Link from 'next/link';
import React from 'react';
import { RiMenu4Line, RiCloseFill } from 'react-icons/ri';
import ThemeSwitch from './ThemeSwitcher';

function MyMenu() {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="">
            <button onClick={() => setOpen(!open)}>
                <RiMenu4Line
                    className="hover:scale-110 duration-200"
                    size={36}
                />
            </button>
            <div
                className={`
                absolute top-0 right-0 overflow-hidden duration-300 transition-all w-[80%] md:w-[60%] h-[100dvh]
                backdrop-blur-sm flex flex-col gap-3 z-50
                ${
                    open
                        ? 'opacity-100 p-5 bg-slate-200/80 dark:bg-slate-900/80 shadow-sm translate-x-0'
                        : 'opacity-0 p-0 translate-x-full'
                }
            `}
            >
                <div className="pt-6">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex w-full justify-end"
                    >
                        <RiCloseFill
                            className="hover:scale-110 duration-200"
                            size={36}
                        />
                    </button>
                </div>
                <ul className="flex flex-col gap-3">
                    <li
                        onClick={() => setOpen(!open)}
                        className="text-2xl font-light hover:font-medium duration-200"
                    >
                        <Link href="/">Inicio</Link>
                    </li>
                </ul>

                <div onClick={() => setOpen(!open)}>
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    );
}

export default MyMenu;
