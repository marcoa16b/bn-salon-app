import WeekCalendar from '@/components/calendar/WeekCalendar';
import MyMenu from '@/components/MyMenu';
import ThemeSwitch from '@/components/ThemeSwitcher';
import Image from 'next/image';
import { RiMenu4Line } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';

export default function Home() {
    // obtener la fecha actual
    const date = new Date();
    const day = date.getDate();
    // mes en formato de texto
    const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(
        date
    );

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <div className="w-9 h-9 rounded-full border border-[--primary-light] dark:border-[--primary-dark] overflow-hidden">
                    <Image
                        src="/images/profile-tmp.webp"
                        alt="Imagen de perfil del usuario"
                        width={36}
                        height={36}
                    />
                </div>
                <MyMenu />
            </div>

            <div>
                <p className="text-[--primary-light] dark:text-[--primary-dark] font-medium text-lg">
                    {day} de {month}
                </p>
                <p className="text-[--accent] font-bold text-4xl">
                    Citas de la semana
                </p>
            </div>

            {/* Componente de calendario y citas semanal */}
            <WeekCalendar />

            {/* BOTON PARA AGREGAR NUEVAS CITAS */}
            <div className="absolute bottom-10 right-5">
                <Link href="/new" legacyBehavior>
                    <a className="flex p-3 bg-[--accent] text-black hover:bg-[--accent-hov] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200">
                        <FaPlus size={28} />
                    </a>
                </Link>
            </div>
        </>
    );
}
