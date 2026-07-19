# Historial: Autenticación e Inicialización Backend & Frontend
**Fecha:** 19 de Julio de 2026

## Resumen de la Implementación
Se completó la implementación del flujo de autenticación OTP (One Time Password) para la aplicación de Notas, abarcando la creación desde cero del backend y la extensión de las vistas del frontend.

### 1. Backend (Spring Boot)
Ubicación: `notas_back_springboot`

Se generó un proyecto base usando Spring Boot 3.4.0 (Java 21) gestionado con Gradle.
Se implementaron las siguientes características:
- **Base de Datos:** Conexión a Neon DB (PostgreSQL) usando Spring Data JPA (`ddl-auto: update` activado para creación de tablas automática desde entidades).
- **Entidades Core:** Creación de las entidades `User`, `Role` y `Otp`.
- **Seguridad (JWT):** Implementación de utilidades (`JwtUtils.java`) para firma y validación de tokens HMAC. El proyecto está configurado de forma *Stateless* usando Spring Security.
- **Servicio de Correos:** Integración de la SDK de Resend Java (`EmailService.java`) para el envío de los códigos OTP usando una plantilla HTML simple y funcional.
- **Endpoints de Autenticación (`AuthController.java`):**
  - `POST /api/auth/register`: Inicia el registro, crea usuario inactivo, envía OTP.
  - `POST /api/auth/verify-registration`: Valida OTP, activa cuenta, retorna JWT.
  - `POST /api/auth/login`: Inicia sesión, retorna JWT.
  - `POST /api/auth/forgot-password`: Inicia recuperación, envía OTP.
  - `POST /api/auth/reset-password`: Valida OTP y establece nueva contraseña.

### 2. Frontend (Angular)
Ubicación: `notas_front_angular`

Se crearon las siguientes pantallas nuevas, manteniendo estrictamente la línea de diseño "Glassmorphism" con animaciones y soporte responsive:
- **`VerifyOtpComponent` (`/verify-otp`):** Pantalla donde el usuario ingresa su código OTP después de registrarse.
- **`ForgotPasswordComponent` (`/forgot-password`):** Pantalla para que el usuario ingrese su correo electrónico para iniciar el proceso de recuperación.
- **`ResetPasswordComponent` (`/reset-password`):** Pantalla donde se ingresa el OTP enviado al correo y la nueva contraseña deseada.

**Modificaciones en archivos existentes:**
- `app.routes.ts`: Se agregaron las rutas para los nuevos componentes.
- `login.component.ts`: Se actualizó el enlace de "¿Olvidaste tu contraseña?" para navegar a `/forgot-password`.
- `register.component.ts`: Se actualizó el botón principal para que luego de iniciar el registro dirija al usuario a `/verify-otp`.

## Próximos Pasos (Opcional)
Para levantar el servidor backend de manera local y probar las APIs (al tiempo que se generan las tablas en Neon DB), ejecutar:
```bash
cd notas_back_springboot
./gradlew bootRun
```
El frontend Angular continuará ejecutándose con `npm start` como de costumbre.
