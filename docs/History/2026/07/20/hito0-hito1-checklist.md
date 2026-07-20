# 🚀 Hito 0 + Hito 1 — Plan de Implementación
**Fecha:** 20 de Julio 2026 | **Hora inicio:** 03:40 AM (UTC-4)

---

## 🐛 Bugs a Corregir (Prioridad Alta)

- [x] **Bug 1 — OTP no funciona (correo no llega)**
  - Conectar `register.component.ts` al backend real con `HttpClient`
  - Pasar el email al componente `verify-otp` vía `queryParams`
  - Conectar `verify-otp.component.ts` al endpoint `/api/auth/verify-registration`

- [x] **Bug 2 — Login ignora el backend**
  - Conectar `login.component.ts` al endpoint `/api/auth/login`
  - Guardar JWT en `localStorage` al hacer login exitoso
  - Redirigir a `/home` solo si la respuesta es exitosa

---

## 🏗️ Infraestructura Base (Prerrequisitos)

- [x] **Agregar `provideHttpClient()` en `app.config.ts`**
- [x] **Crear `AuthService`** en `src/app/core/services/auth.service.ts`
  - `login(email, password)` → POST `/api/auth/login`
  - `register(email, password)` → POST `/api/auth/register`
  - `verifyRegistrationOtp(email, otp)` → POST `/api/auth/verify-registration`
  - `forgotPassword(email)` → POST `/api/auth/forgot-password`
  - `resetPassword(email, otp, newPassword)` → POST `/api/auth/reset-password`
  - `getToken()`, `isLoggedIn()`, `logout()`
- [x] **Crear `AuthGuard`** en `src/app/core/guards/auth.guard.ts`
  - Protege `/home` y demás rutas privadas
  - Redirige a `/login` si no hay token
- [x] **Crear `JwtInterceptor`** en `src/app/core/interceptors/jwt.interceptor.ts`
  - Inyecta el header `Authorization: Bearer <token>` en cada request

---

## 🚩 Hito 0 — Ecosistema, Preferencias y Seguridad

### Auth Flows (Frontend ↔ Backend)

- [x] **Login real conectado al backend**
  - Inputs con `[(ngModel)]`
  - Llamada HTTP real
  - Manejo de errores (mensaje visual)
  - Guardar token JWT en localStorage
  - Redirect a `/home` si exitoso

- [x] **Registro real conectado al backend**
  - Inputs con `[(ngModel)]`
  - Llamada HTTP real a `/api/auth/register`
  - Redirect a `/verify-otp?email=...` con email en queryParam

- [x] **Verificación OTP conectada al backend**
  - Leer email de queryParams
  - Inputs individuales para cada dígito OTP (UX)
  - Llamada HTTP real a `/api/auth/verify-registration`
  - Guardar token JWT y redirigir a `/home`

- [x] **Forgot Password conectado al backend**
  - Llamada HTTP real a `/api/auth/forgot-password`
  - Redirect a `/verify-otp?email=...&mode=reset`

- [x] **Reset Password conectado al backend**
  - Llamada HTTP real a `/api/auth/reset-password`
  - Redirect a `/login` tras éxito

### Preferencias de Usuario (Hito 0)

- [x] **Servicio UserPreferences** → Leer/guardar tema en el perfil del usuario
- [x] **Sincronizar `themeName` con el backend** (campo ya en User.java)
  - Al cargar la app, leer el tema del servidor
  - Al cambiar tema, actualizar en el servidor

---

## 🚩 Hito 1 — Core: Categorías y Notas

### Backend — Nuevas entidades y endpoints

- [x] **Modelo `Category`** (id, userId, name, color, createdAt, deletedAt)
- [x] **Modelo `Note`** (id, userId, categoryId nullable, title, body, noteType, createdAt, updatedAt, deletedAt)
- [x] **Enum `NoteType`** (TEXT, CHECKLIST)
- [x] **`CategoryRepository`** + **`NoteRepository`**
- [x] **`CategoryService`** (CRUD con soft-delete)
- [x] **`NoteService`** (CRUD con soft-delete, mover, duplicar)
- [x] **`CategoryController`** → `/api/categories`
- [x] **`NoteController`** → `/api/notes`
- [x] **Agregar `JwtAuthFilter`** al pipeline de Spring Security
- [x] **Agregar `UserDetailsService`** para que Spring cargue el usuario por email

### Frontend — Servicios

- [x] **`CategoryService`** Angular → CRUD de categorías
- [x] **`NoteService`** Angular → CRUD de notas

### Frontend — Home Page (Hito 1 UI)

- [x] **Sidebar de categorías**
  - Lista de categorías del usuario
  - Botón "General / Sin clasificar"
  - Botón "+ Nueva categoría"
  - Eliminar / renombrar categoría (menú contextual)

- [x] **Panel central de notas**
  - Lista de notas de la categoría seleccionada
  - Nota tipo "chat bubble" (estética actual)
  - Scroll infinito / paginación

- [x] **Input inferior tipo chat**
  - Crear nota rápida (texto)
  - Soporte básico para checklist

- [x] **Acciones de nota**
  - Editar nota inline
  - Eliminar nota (soft-delete)
  - Mover nota a otra categoría
  - Duplicar nota

---

## 📝 Notas de Estado

| Componente | Estado Actual | Estado Objetivo |
|---|---|---|
| `login.component.ts` | Mock (solo navega) | Conectado al backend |
| `register.component.ts` | Mock (solo navega) | Conectado al backend |
| `verify-otp.component.ts` | Mock (solo console.log) | Conectado al backend |
| `forgot-password.component.ts` | Mock | Conectado al backend |
| `reset-password.component.ts` | Mock | Conectado al backend |
| `home.component.ts` | Mock con datos locales | Conectado al backend |
| `AuthService` | No existe | Crear |
| `AuthGuard` | No existe | Crear |
| `JwtInterceptor` | No existe | Crear |
| `CategoryService` (Angular) | No existe | Crear |
| `NoteService` (Angular) | No existe | Crear |
| `CategoryController` (Spring) | No existe | Crear |
| `NoteController` (Spring) | No existe | Crear |
| `JwtAuthFilter` (Spring) | Comentado | Activar y completar |
