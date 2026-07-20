# 🚀 Despliegue Cloud — KomodoNotas Full Stack
**Fecha:** 20 de Julio 2026 | **Hora:** 03:25 AM (UTC-4)

---

## ✅ Pasos Completados

### 🐳 Backend — Spring Boot en Render
- [x] **03:00** — Creado `Dockerfile` en la raíz de `notas_back_springboot`
  - Multi-stage build (Java 21, Alpine)
  - Imagen base: `eclipse-temurin:21-jdk-alpine` → `eclipse-temurin:21-jre-alpine`
  - Puerto expuesto: `8080`

- [x] **03:10** — Configuradas variables de entorno en `application.yml`
  - `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` → Neon PostgreSQL
  - `JWT_SECRET`, `JWT_EXPIRATION_MS` → Autenticación segura
  - `RESEND_API_KEY`, `RESEND_FROM_EMAIL` → Servicio de correos
  - `ALLOWED_ORIGINS` → CORS dinámico

- [x] **03:12** — Actualizado `SecurityConfig.java`
  - CORS ahora lee `ALLOWED_ORIGINS` desde variables de entorno
  - Soporte para múltiples orígenes separados por coma

- [x] **03:20** — Ingresadas todas las variables en Render dashboard:
  - `RESEND_API_KEY` ✔️
  - `RESEND_FROM_EMAIL` ✔️
  - `DATABASE_URL` ✔️
  - `DATABASE_USERNAME` ✔️
  - `DATABASE_PASSWORD` ✔️
  - `JWT_SECRET` ✔️
  - `ALLOWED_ORIGINS` = `https://gstla1985-oss.github.io` ✔️

- [x] **03:24** — **Deploy iniciado en Render** (estado: *Building...*)
  - Servicio: `notas_back_springboot`
  - URL: https://notas-back-springboot.onrender.com
  - Repositorio: `gstla1985-oss/notas_back_springboot` (rama `main`)

### 🌐 Frontend — Angular en GitHub Pages
- [x] **03:15** — Creados archivos de entorno Angular:
  - `environment.ts` → API en Render (producción)
  - `environment.development.ts` → `localhost:8080` (local)
- [x] **03:16** — Configurado `angular.json` con `fileReplacements` para intercambio automático por entorno

---

## 🔜 Próximos Pasos

### Inmediato — Subir cambios a GitHub

- [ ] **Commit y push del Backend:**
  ```bash
  git add Dockerfile src/main/resources/application.yml src/main/java/com/komodo/notas/config/SecurityConfig.java
  git commit -m "feat: add Dockerfile and env variables support for Render deploy"
  git push
  ```

- [ ] **Commit y push del Frontend:**
  ```bash
  git add src/environments/ angular.json
  git commit -m "feat: add environment configs for production (Render API URL)"
  git push
  ```

### Después del Deploy

- [ ] Esperar que Render termine el build (puede tomar ~5-10 min la primera vez)
- [ ] Verificar que la API responde en: https://notas-back-springboot.onrender.com/api/auth/...
- [ ] GitHub Actions redesplegará el frontend automáticamente con la URL de Render
- [ ] Probar login/registro desde GitHub Pages al API de Render

### Desarrollo pendiente en Frontend

- [ ] Implementar `HttpClient` en los servicios Angular usando `environment.apiUrl`
- [ ] Crear `AuthService` conectado al backend (`/api/auth/login`, `/api/auth/register`)
- [ ] Agregar `provideHttpClient()` en `app.config.ts`
- [ ] Implementar guards de rutas (proteger `/home`)
- [ ] Conectar todos los demás endpoints al backend

---

## 🗺️ Arquitectura Final (Cloud)

```
GitHub Pages (gstla1985-oss.github.io/notas_front_angular)
        │
        │ HTTPS + CORS habilitado
        ▼
Render (notas-back-springboot.onrender.com)
        │
        │ JDBC / SSL
        ▼
Neon PostgreSQL (us-east-1.aws.neon.tech)
```

---

> ⚠️ **Nota Render Free Tier:** El servicio se "duerme" tras 15 min de inactividad. La primera request puede tardar ~50 segundos en despertar.
