# 17:24 - Perfil de Usuario y Ajuste de Menú de Opciones

En esta iteración se realizaron dos implementaciones principales enfocadas en la experiencia de usuario y la gestión de la cuenta:

## 1. Pantalla de Usuario (Perfil) y Cambio de Contraseña

Se agregó una nueva sección dedicada al usuario para visualizar su información básica y gestionar la seguridad de su cuenta.

*   **Nuevo Componente (`ProfileComponent`)**: Se creó una nueva pantalla en `src/app/pages/profile/profile.component.ts`. Esta pantalla muestra:
    *   El correo electrónico de la cuenta activa.
    *   Un formulario completo para el cambio de contraseña (contraseña actual, nueva contraseña y confirmación de la nueva contraseña).
    *   Validaciones básicas en el formulario (coincidencia de contraseñas, longitud mínima).
    *   Feedback visual (mensajes de éxito y error, spinner de carga).
*   **Servicio de Autenticación (`AuthService`)**: Se agregó el método `changePassword` para comunicarse con el backend a través del endpoint `/auth/change-password`.
*   **Enrutamiento (`app.routes.ts`)**: Se registró la ruta `/profile`, protegiéndola adecuadamente con el guardián de autenticación (`authGuard`).
*   **Acceso desde el Home (`HomeComponent`)**: Se añadió un nuevo botón con un ícono de "llave" (Mi Cuenta) dentro del panel desplegable de Configuración en el sidebar, permitiendo una navegación fluida hacia la nueva pantalla de perfil.

## 2. Ajuste Visual del Menú de Opciones de Notas

Se resolvió un problema visual donde el menú contextual de las notas (los tres puntos verticales) se cortaba en los bordes derechos de la pantalla.

*   **Corrección de Posicionamiento (`HomeComponent`)**: Se ajustó la lógica en el método `openNoteMenu`. Ahora, en lugar de renderizar el menú expandiéndose hacia la derecha desde el punto de clic, se resta el ancho estimado del menú (210px) a la coordenada `x`.
*   **Resultado**: Esto asegura que el menú siempre se expanda hacia la izquierda del cursor, manteniéndose completamente visible independientemente del ancho de la pantalla, con un margen de seguridad (`Math.max`) para evitar que se desborde por el lado izquierdo.
