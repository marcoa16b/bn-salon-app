'use client';
import { type Appointment as AppointmentIntf } from '@/lib/Models';
import React from 'react';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Appointment from './Appointment';

function WeekCalendar() {
    const [daySelected, setDaySelected] = React.useState(0);
    const [weekDays, setWeekDays] = React.useState<
        { day: number; name: string }[]
    >([]);
    const [weekOffset, setWeekOffset] = React.useState(0);
    const [appointments, setAppointments] = React.useState<Appointment[]>([]);
    const [filteredAppointments, setFilteredAppointments] = React.useState<
        Appointment[]
    >([]);
    const [appointmentDeleted, setAppointmentDeleted] = React.useState(false);

    // funcion que se activa al eliminar una cita
    React.useEffect(() => {
        if (appointmentDeleted) {
            const existingAppointments = JSON.parse(
                localStorage.getItem('appointments') || '[]'
            );
            cleanOldAppointments(existingAppointments);
            setAppointments(existingAppointments);
            setAppointmentDeleted(false);
        }
    }, [appointmentDeleted]);

    // Obtener array con los dias de la semana actual
    React.useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() + weekOffset * 7); // Ajustar la fecha según el offset de la semana

        const newWeekDays = Array.from({ length: 7 }, (_, i) => {
            const currentDate = new Date(date);
            currentDate.setDate(date.getDate() - date.getDay() + i); // Ajustar para que comience desde el domingo
            return {
                day: currentDate.getDate(),
                name: currentDate.toLocaleDateString('es-ES', {
                    weekday: 'short',
                }),
            };
        });

        setWeekDays(newWeekDays);
        setDaySelected(0); // Resetear el día seleccionado al cambiar de semana

        // si en la semana actual, se encuentra el dia seleccionado, se coloca el dia de hoy en el estado seleccionado
        if (weekOffset === 0) {
            const today = new Date();
            setDaySelected(today.getDay());
        }
    }, [weekOffset]);

    // Cargar y limpiar las citas del localStorage
    React.useEffect(() => {
        const existingAppointments = JSON.parse(
            localStorage.getItem('appointments') || '[]'
        );
        cleanOldAppointments(existingAppointments);
        setAppointments(existingAppointments);
    }, []);

    // filtrar las citas segun el dia seleccionado al cambiar de dia
    React.useEffect(() => {
        const date = new Date();
        date.setDate(date.getDate() + weekOffset * 7); // Ajustar la fecha según el offset de la semana

        const currentDate = new Date(date);
        currentDate.setDate(date.getDate() - date.getDay() + daySelected); // Ajustar para que comience desde el domingo

        const filteredAppointments = appointments.filter(
            (appointment: AppointmentIntf) => {
                const appointmentDate = new Date(appointment.date);
                return (
                    appointmentDate.getDate() === currentDate.getDate() &&
                    appointmentDate.getMonth() === currentDate.getMonth() &&
                    appointmentDate.getFullYear() === currentDate.getFullYear()
                );
            }
        );

        console.log('Citas del día', filteredAppointments);
        setFilteredAppointments(filteredAppointments);
    }, [appointments, daySelected, weekOffset]);

    // Función para limpiar citas antiguas
    const cleanOldAppointments = (appointments: Appointment[]) => {
        const today = new Date();
        const cutoffDate = new Date();
        cutoffDate.setFullYear(today.getFullYear() - 1); // Citas más antiguas que un año

        const filteredAppointments = appointments.filter((appointment) => {
            const appointmentDate = new Date(appointment.date);
            return appointmentDate >= cutoffDate;
        });

        // Guardar las citas limpias en el localStorage
        localStorage.setItem(
            'appointments',
            JSON.stringify(filteredAppointments)
        );
    };

    return (
        <div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <button
                        onClick={() => setWeekOffset((prev) => prev - 1)}
                        className="p-2 rounded-full border border-black/20 dark:border-white/20 hover:bg-[#AD8AF0]/20"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={() => setWeekOffset((prev) => prev + 1)}
                        className="p-2 rounded-full border border-black/20 dark:border-white/20 hover:bg-[#AD8AF0]/20"
                    >
                        <FaChevronRight />
                    </button>
                </div>
                <div className="flex gap-1">
                    {weekDays.map((day, index) => (
                        <button
                            key={index}
                            onClick={() => setDaySelected(index)}
                            className={`
                                p-2 w-full rounded-md
                                ${
                                    index === daySelected
                                        ? 'bg-[#D0C7DF] dark:bg-[#141115]'
                                        : ' '
                                }
                            `}
                        >
                            <p className="text-xs text-[--primary-light] dark:text-[--primary-dark] font-medium">
                                {day.name}
                            </p>
                            <p className="text-lg text-[--txt-light] dark:text-[--txt-dark] font-medium">
                                {String(day.day).padStart(2, '0')}
                            </p>
                        </button>
                    ))}
                </div>
                <div>
                    {/* Listar las citas agendadas */}
                    <div className="flex flex-col gap-3">
                        {filteredAppointments.map((appointment) => (
                            <Appointment
                                key={appointment.id}
                                appointment={appointment}
                                setAppointmentDeleted={setAppointmentDeleted}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeekCalendar;
