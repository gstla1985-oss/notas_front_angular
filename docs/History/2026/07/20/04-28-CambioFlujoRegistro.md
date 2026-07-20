# Cambio en Flujo de Registro (04:28)

Debido a las limitaciones del plan gratuito de **Resend** (que solo permite enviar correos electrónicos a la dirección verificada del propietario de la cuenta, en este caso `gstla1985@gmail.com`), se ha decidido simplificar el flujo de registro.

## Cambios Implementados

### Backend (Spring Boot)
1. **`AuthService.java`**: Se modificó el método `register`. Ya no se genera ni se guarda un OTP en la base de datos, y ya no se envía el correo electrónico a través de Resend al crear una cuenta.
2. El usuario se marca como `activo = true` inmediatamente tras ser creado.
3. El método ahora retorna directamente un objeto `AuthResponse` que contiene el token JWT recién generado para ese usuario.
4. **`AuthController.java`**: El endpoint `/api/auth/register` ahora devuelve un código HTTP 200 OK con el `AuthResponse` (el token) en el cuerpo de la respuesta.

### Frontend (Angular)
1. **`auth.service.ts`**: El método `register` se actualizó para leer la respuesta del servidor (`AuthResponse`). Si el servidor devuelve un token válido, este se guarda automáticamente en `localStorage` (junto con el email) iniciando así la sesión del usuario inmediatamente tras registrarse.
2. **`register.component.ts`**: Se eliminó la redirección hacia la pantalla de verificación OTP (`/verify-otp`). Ahora, si el registro es exitoso, el usuario es redirigido directamente a la pantalla principal (`/home`).

### Siguientes pasos (Decisiones Arquitectónicas)
- Se ha acordado que, en un futuro cercano, se implementará un rol "creador" que será el único usuario con privilegios para el respaldo (backup) de la base de datos.

> **Nota para el desarrollador:** Los cambios del frontend ya fueron subidos (push) a GitHub. Sin embargo, **el push del backend falló** por un error de permisos (`403 Forbidden`). Por favor, haz un `git push` manualmente en tu terminal del backend para que los cambios se suban y Render se actualice.
