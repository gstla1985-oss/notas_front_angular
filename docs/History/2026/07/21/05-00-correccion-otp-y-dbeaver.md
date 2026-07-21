# Historial de Cambios: Corrección de Bug OTP y Configuración DBeaver

**Fecha:** 21 de Julio de 2026  
**Ubicación:** `notas_front_angular/docs/History/2026/07/21/05-00-correccion-otp-y-dbeaver.md`

---

## 1. Diagnóstico y Resolución del Bug OTP

### Problema
Al intentar iniciar sesión con el correo `djaraestivill@gmail.com`, la aplicación desplegada continuaba arrojando el mensaje de error:
> *"La cuenta no está verificada. Por favor verifica con tu OTP."*

### Causa Raíz
1. **Estado en Base de Datos:** La cuenta `djaraestivill@gmail.com` había sido creada previamente cuando el flujo de registro todavía utilizaba verificación por correo/OTP. Por ello, la columna `active` en la tabla `users` permanecía en `false`.
2. **Código del Backend:** Si bien en los commits recientes del backend (`80ce368` y `561ca0f`) ya se había removido la exigencia de OTP y la validación `isActive()` en la fase de login, la cuenta en producción seguía marcada como inactiva (`active = false`).

### Acciones Realizadas
1. **Actualización de Base de Datos:** Se ejecutó una consulta directa a la base de datos de PostgreSQL en Neon (`neondb`), actualizando el estado de la cuenta:
   ```sql
   UPDATE users SET active = true WHERE email = 'djaraestivill@gmail.com';
   ```
   Con esto, el usuario ya puede iniciar sesión de manera normal sin ser bloqueado.
2. **Verificación de Repositorios Git:**
   - Repositorio `origin` (`djarae/notas_back_springboot`): Contiene los últimos cambios donde se eliminó el flujo OTP del backend.
   - Repositorio `upstream` (`gstla1985-oss/notas_back_springboot`): Si Render despliega automáticamente desde la organización `gstla1985-oss`, el propietario debe sincronizar los commits del branch `main` de `origin` a `upstream`.

---

## 2. Guía de Conexión a Neon PostgreSQL desde DBeaver

Para conectarse a la base de datos PostgreSQL en Neon desde DBeaver usando la URI:
`postgresql://neondb_owner:npg_ewKR8QPNCD4Y@ep-noisy-wind-auvjlq6g-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

### Opción A: Importación mediante "Paste Connection String / URL" (Recomendada)
1. Abrir **DBeaver**.
2. Ir al menú superior: **Database** > **New Database Connection** (o presionar `Ctrl + N`).
3. En la pestaña superior, seleccionar la pestaña **Custom / URL** o pegar directamente el String.
4. En el campo **JDBC URL / Connection String**, pegar:
   ```text
   jdbc:postgresql://ep-noisy-wind-auvjlq6g-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
5. En **Username** colocar: `neondb_owner`
6. En **Password** colocar: `npg_ewKR8QPNCD4Y`
7. Hacer clic en **Test Connection** y luego en **Finish**.

### Opción B: Configuración Manual por Parámetros
1. En DBeaver, crear una nueva conexión y seleccionar el driver **PostgreSQL**.
2. Completar los campos de la pestaña **Main**:
   - **Host / Server:** `ep-noisy-wind-auvjlq6g-pooler.c-10.us-east-1.aws.neon.tech`
   - **Port:** `5432`
   - **Database:** `neondb`
   - **Username:** `neondb_owner`
   - **Password:** `npg_ewKR8QPNCD4Y`
3. Ir a la pestaña **Driver Properties** o **SSL**:
   - En la pestaña **SSL**, marcar la casilla **Use SSL**.
   - En **SSL Mode**, seleccionar `require` (o `verify-full`).
4. Probar la conexión (**Test Connection**) y guardar (**Finish**).
