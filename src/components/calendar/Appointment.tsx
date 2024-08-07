'use client';
import { type Appointment } from '@/lib/Models';
import Link from 'next/link';
import React from 'react';

function Appointment({
    appointment,
    setAppointmentDeleted,
}: {
    appointment: Appointment;
    setAppointmentDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [showDetails, setShowDetails] = React.useState(false);

    // Obtener la fecha de la cita
    const date = new Date(appointment.date);
    // Obtener la hora de la cita en formato de 12 horas y AM/PM
    const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    // Funcion para eliminar la cita
    const handleDelete = () => {
        // Obtener las citas existentes del localStorage
        const existingAppointments = JSON.parse(
            localStorage.getItem('appointments') || '[]'
        );

        // Eliminar la cita de la lista
        const newAppointments = existingAppointments.filter(
            (item: Appointment) => item.id != appointment.id
        );

        // Guardar la lista actualizada en el localStorage
        localStorage.setItem('appointments', JSON.stringify(newAppointments));
        setAppointmentDeleted(true);
    };

    return (
        <div
            onClick={() => setShowDetails(!showDetails)}
            className="relative pb-3 border-b border-black/10 dark:border-white/10 cursor-pointer"
        >
            <div
                className={`flex gap-2 items-center p-2 rounded-t-xl ${
                    showDetails ? 'bg-white/5' : ''
                }`}
            >
                <div className="flex flex-col items-center font-light text-sm text-[--accent]">
                    <p>{time.split(' ')[0]}</p>
                    <p>{time.split(' ')[1]}</p>
                </div>
                <div className="w-full border-l border-[--accent] pl-3">
                    <p className="font-medium ">{appointment.name}</p>
                    <p className="font-light text-sm text-[--primary-light] dark:text-[--primary-dark]">
                        {appointment.service}
                    </p>
                </div>
                <div className="w-[30%] text-balance">
                    <p className="font-medium text-xl">
                        {Intl.NumberFormat('es-Cr', {
                            style: 'currency',
                            currency: 'CRC',
                            currencyDisplay: 'symbol',
                        }).format(appointment.price)}
                    </p>
                    <p className="text-sm text-[--txt-light] dark:text-[--txt-dark] opacity-60">
                        {appointment.duration.toString()} min
                    </p>
                </div>
            </div>
            <div
                className={`flex items-center w-full overflow-hidden duration-200 ${
                    showDetails ? 'h-fit' : 'h-0'
                }`}
            >
                <Link href={`/edit/${appointment.id}`} legacyBehavior>
                    <a className="w-full text-center py-1 bg-[#AD8AF0] text-black rounded-bl-xl">
                        Editar
                    </a>
                </Link>
                <button
                    onClick={handleDelete}
                    className="w-full py-1 bg-[#AE2121] text-white rounded-br-xl"
                >
                    Elimiinar
                </button>
            </div>
        </div>
    );
}

export default Appointment;
