'use client';
import MyMenu from '@/components/MyMenu';
import { type Appointment as AppointmentIntf } from '@/lib/Models';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

function New() {
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        name: '',
        service: '',
        date: '',
        duration: '',
        price: '',
    });

    // funcion para guardar la cita
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Obtener los datos del formulario
            const id = Math.floor(Math.random() * 1000000);
            const { name, service, date, duration, price } = formData;

            // Validación de campos vacíos
            if (!name || !service || !date || !duration || !price) {
                alert('Todos los campos son obligatorios.');
                return;
            }

            // Validación de fecha
            const selectedDate = new Date(date);
            const today = new Date();
            const maxDate = new Date();
            maxDate.setMonth(today.getMonth() + 2); // Máximo dos meses después de hoy

            // Comprobar si la fecha es anterior a hoy
            if (selectedDate < today) {
                alert('No se pueden agendar citas en una fecha pasada.');
                return;
            }

            // Comprobar si la fecha es más de dos meses en el futuro
            if (selectedDate > maxDate) {
                alert(
                    'No se pueden agendar citas más de dos meses en el futuro.'
                );
                return;
            }

            // Convertir duración a minutos
            const durationMinutes = parseInt(duration, 10);
            if (isNaN(durationMinutes) || durationMinutes <= 0) {
                alert('La duración debe ser un número positivo.');
                return;
            }

            // Calcular el tiempo de finalización de la nueva cita
            const endTime = new Date(
                selectedDate.getTime() + durationMinutes * 60000
            );

            // Obtener las citas existentes del localStorage
            const existingAppointments = JSON.parse(
                localStorage.getItem('appointments') || '[]'
            );

            // Verificar si la nueva cita se superpone con alguna cita existente
            const hasOverlap = existingAppointments.some(
                (appointment: AppointmentIntf) => {
                    const existingStart = new Date(appointment.date);
                    const durationString = appointment.duration.toString();
                    const existingDuration = parseInt(durationString, 10);
                    const existingEnd = new Date(
                        existingStart.getTime() + existingDuration * 60000
                    );

                    // Comprobar si hay solapamiento
                    return (
                        (selectedDate < existingEnd &&
                            endTime > existingStart) ||
                        (endTime > existingStart && endTime <= existingEnd) ||
                        (selectedDate >= existingStart &&
                            selectedDate < existingEnd)
                    );
                }
            );

            if (hasOverlap) {
                alert('La cita se superpone con otra cita existente.');
                return;
            }

            // Crear el objeto de la cita
            const data = {
                id,
                name,
                service,
                date,
                duration,
                price,
            };

            // Agregar la nueva cita a la lista
            existingAppointments.push(data);

            // Guardar la lista actualizada en el localStorage
            localStorage.setItem(
                'appointments',
                JSON.stringify(existingAppointments)
            );

            alert('Cita guardada correctamente');

            // Redireccionar a la página de inicio (asumiendo que se utiliza un enrutador)
            router.push('/');
        } catch (error) {
            alert('Ocurrió un error al guardar la cita');
            console.error(error);
        }
    };

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

            <h2 className="text-4xl font-bold text-[--accent]">Nueva cita</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-xl">
                        Nombre del cliente
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        className="text-base text-[--txt-light] dark:text-[--txt-dark] placeholder:text-[#737373] dark:placeholder:text-white/30 bg-[#ECE9EE] dark:bg-[#141115] rounded-xl px-5 py-2.5"
                        placeholder="Jane Doe"
                    />
                    <span
                        id="span-name"
                        className="text-xs text-[#737373]"
                    ></span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="service" className="text-xl">
                        Servicio solicitado
                    </label>
                    <input
                        type="text"
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                service: e.target.value,
                            })
                        }
                        className="text-base text-[--txt-light] dark:text-[--txt-dark] placeholder:text-[#737373] dark:placeholder:text-white/30 bg-[#ECE9EE] dark:bg-[#141115] rounded-xl px-5 py-2.5"
                        placeholder="Corte de pelo"
                    />
                    <span
                        id="span-service"
                        className="text-xs text-[#737373]"
                    ></span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="date" className="text-xl">
                        Fecha y hora
                    </label>
                    <input
                        type="datetime-local"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                        }
                        className="text-base text-[--txt-light] dark:text-[--txt-dark] placeholder:text-[#737373] dark:placeholder:text-white/30 bg-[#ECE9EE] dark:bg-[#141115] rounded-xl px-5 py-2.5"
                    />
                    <span
                        id="span-date"
                        className="text-xs text-[#737373]"
                    ></span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="duration" className="text-xl">
                        Duracion
                    </label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                duration: e.target.value,
                            })
                        }
                        className="text-base text-[--txt-light] dark:text-[--txt-dark] placeholder:text-[#737373] dark:placeholder:text-white/30 bg-[#ECE9EE] dark:bg-[#141115] rounded-xl px-5 py-2.5"
                        placeholder="90"
                    />
                    <span id="span-duration" className="text-xs text-[#737373]">
                        En minutos. Ej: 1h y 30min = 90min
                    </span>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="text-xl">
                        Precio
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                        }
                        className="text-base text-[--txt-light] dark:text-[--txt-dark] placeholder:text-[#737373] dark:placeholder:text-white/30 bg-[#ECE9EE] dark:bg-[#141115] rounded-xl px-5 py-2.5"
                        placeholder="15000"
                    />
                    <span
                        id="span-price"
                        className="text-xs dark:text-[#737373]"
                    >
                        En minutos. Ej: 1h y 30min = 90min
                    </span>
                </div>

                <div className="mt-5">
                    <button
                        type="submit"
                        className="w-full font-medium text-xl bg-[--primary-light] dark:bg-[--primary-dark] hover:bg-[--accent] dark:hover:bg-[--accent] text-white dark:text-black hover:text-white rounded-full px-5 py-2.5 duration-200"
                    >
                        Guardar cita
                    </button>
                </div>
            </form>
        </>
    );
}

export default New;
