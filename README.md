# Beauty Nails Salon

## Proyecto de Agenda de Citas

Este es un proyecto simple diseñado para administrar citas en un salón de belleza. La aplicación permite a un usuario agendar, visualizar y gestionar citas utilizando almacenamiento local en el navegador. El proyecto fue construido en un solo día y está orientado para el uso de una sola persona que desee mantener un registro de las citas de su local.

Se construyó como una Aplicación Web Progresiva (PWA) para facilitar la utilización de la misma desde un dispositivo movil como una app instalada y no como una web, proporcionando facilidad para el usuario que la utilizará.

## Características

-   **Agendar Citas**: Permite al usuario ingresar información sobre una cita, incluyendo nombre, servicio, fecha, duración y precio.
-   **Visualizar Citas**: Muestra las citas programadas para el día seleccionado en un calendario semanal.
-   **Validación de Citas**: Verifica que las citas no se superpongan con citas existentes y que las fechas sean válidas (no en el pasado y dentro de un rango de dos meses en el futuro).
-   **Almacenamiento Local**: Utiliza `localStorage` del navegador para guardar y recuperar las citas, lo que significa que no se requiere una base de datos externa.
