# Planificación Hito 0: Ecosistema, Preferencias y Seguridad

## Decisiones Arquitectónicas Confirmadas (Hito 0)
- **Sincronización a Demanda/Por Eventos:** No se usarán WebSockets. La sincronización ocurre explícitamente al pulsar el botón "Sincronizar" en el Home, al iniciar sesión y al insertar una nota.
- **Resolución de Conflictos Global:** La política de "Last Write Wins" (basado en `updated_at`) aplica para todos los datos sincronizables, incluyendo las preferencias del perfil de usuario (`users`).
- **Manejo de Sesiones vs Preferencias:** El tema e idioma (preferencias) están ligados a la cuenta del usuario, por lo que serán idénticos en todos sus dispositivos activos (misma sesión = mismas preferencias).
- **Envío de Respaldo JSON:** Se envía al correo vía Resend. (Considerar límites de tamaño del adjunto a futuro).
- **Identificación de Dispositivos:** Se usará un UUID local en el almacenamiento para distinguir cada dispositivo de un usuario y gestionar la tabla `users_devices`.

---

## 1. Infraestructura y Despliegues (A cargo del usuario 👑)
- [ ] Crear repositorio y configurar Github Pages para el Frontend (Web).
- [ ] Configurar y desplegar la Base de Datos (PostgreSQL u otro).
- [ ] Configurar y desplegar la API en Render.
- [ ] Crear cuenta en Resend, verificar dominio y obtener API Keys.
- [ ] Configurar el entorno de desarrollo para Ionic y asegurar que compile la versión inicial.

## 2. Base de Datos (Migraciones y Semillas)
- [ ] Crear tabla `subscriptions` (Planes: Gratis, Premium).
- [ ] Crear tabla `countries` (ISO codes) e insertar lista base.
- [ ] Crear tabla `languages` (Códigos de idioma) e insertar lista base.
- [ ] Crear tabla `roles` (Permisos) e insertar lista base.
- [ ] Crear tabla `users` (Campos: email, password_hash, subscription_id, role_id, country_id, language_id, theme_name, created_at, updated_at).
- [ ] Crear tabla `devices` (Identificadores de aparatos, nombre, plataforma).
- [ ] Crear tabla `users_devices` (Relación usuario-dispositivo, `last_synced_at`).

## 3. Backend (API - El Motor)
- [ ] **Autenticación:**
  - [ ] Endpoint de Registro (Crear usuario con preferencias por defecto).
  - [ ] Endpoint de Login (Validar credenciales, registrar/actualizar el dispositivo en `users_devices`, devolver Token/Sesión).
  - [ ] Endpoint de Logout (Invalidar la sesión del dispositivo específico).
- [ ] **Gestión de Preferencias:**
  - [ ] Endpoint para obtener las preferencias del usuario (Idioma, País, Tema).
  - [ ] Endpoint para actualizar preferencias (Aplicando lógica "Last Write Wins" verificando `updated_at`).
- [ ] **Seguridad y Respaldo:**
  - [ ] Integrar SDK de Resend en el proyecto backend.
  - [ ] Endpoint para compilar la información de `users` en formato JSON y enviarla al correo del usuario.
- [ ] **Infraestructura de Sincronización:**
  - [ ] Endpoint general de Sincronización (recibe datos locales más recientes del cliente y devuelve los datos del servidor más recientes).

## 4. Frontend (Página Web - Github Pages)
- [ ] Configurar cliente HTTP (Axios/Fetch) y sistema de rutas.
- [ ] **Vistas Básicas:**
  - [ ] UI de Login y Registro.
  - [ ] UI de Ajustes / Perfil (Selectores de Tema, Idioma, País).
- [ ] **Lógica de Preferencias:**
  - [ ] Implementar inyección dinámica de variables CSS para el Tema (Zafiro, Blueberry, etc).
  - [ ] Implementar sistema de internacionalización (i18n) para el cambio de idioma.
- [ ] **Sincronización:**
  - [ ] Guardado local persistente de credenciales y preferencias (LocalStorage / IndexedDB).
  - [ ] Crear el botón "Sincronizar" en la pantalla Home (Web).
  - [ ] Lógica para ejecutar sincronización automáticamente al: Iniciar Sesión y al Insertar una Nota.
  - [ ] Actualizar el tema y el idioma de la UI tras recibir nueva información desde el proceso de sincronización.
- [ ] **Funciones Extra:**
  - [ ] Botón de "Solicitar Respaldo de Seguridad".

## 5. Frontend Móvil (Ionic)
- [ ] Inicializar el proyecto Ionic basándose en la lógica web.
- [ ] **Vistas Básicas:**
  - [ ] UI adaptada a móvil para Login y Ajustes.
- [ ] **Sincronización Móvil (El gran objetivo):**
  - [ ] Implementar el botón "Sincronizar" en el Home móvil.
  - [ ] **Prueba de Fuego 1 (Tema):** Cambiar el tema en el Celular, presionar "Sincronizar" (o insertar nota) -> Ir a la Web, presionar "Sincronizar" -> Revisar que el tema se aplique.
  - [ ] **Prueba de Fuego 2 (Idioma):** Cambiar el idioma en la Web, presionar "Sincronizar" -> Ir al Celular, presionar "Sincronizar" -> Revisar que el idioma se aplique.
- [ ] Compilar y probar en entorno real (Android/iOS) confirmando que los datos locales sobreviven al reinicio de la app.
