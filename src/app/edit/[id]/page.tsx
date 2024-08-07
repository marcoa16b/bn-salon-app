'use client';
import React from 'react';
import MyMenu from '@/components/MyMenu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function Edit({ params }: { params: { id: string } }) {
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
            const data = {
                id: params.id,
                name: formData.name,
                service: formData.service,
                date: formData.date,
                duration: formData.duration,
                price: formData.price,
            };

            // Obtener las citas existentes del localStorage
            const existingAppointments = JSON.parse(
                localStorage.getItem('appointments') || '[]'
            );

            // Actualizar la cita en la lista
            const index = existingAppointments.findIndex(
                (appointment: { id: string }) => appointment.id == params.id
            );
            existingAppointments[index] = data;

            // Guardar la lista actualizada en el localStorage
            localStorage.setItem(
                'appointments',
                JSON.stringify(existingAppointments)
            );

            alert('Cita guardada correctamente');

            router.push('/');
        } catch (error) {
            alert('Ocurrio un error al guardar la cita');
        }
    };

    // Obtener la cita a editar
    React.useEffect(() => {
        const existingAppointments = JSON.parse(
            localStorage.getItem('appointments') || '[]'
        );

        const appointment = existingAppointments.find(
            (appointment: { id: string }) => appointment.id == params.id
        );

        if (appointment) {
            console.log(appointment);
            setFormData({
                name: appointment.name,
                service: appointment.service,
                date: appointment.date,
                duration: appointment.duration,
                price: appointment.price,
            });
        } else {
            console.log('No se encontro la cita');
        }
    }, [params.id]);

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
                    <span id="span-price" className="text-xs text-[#737373]">
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

export default Edit;
