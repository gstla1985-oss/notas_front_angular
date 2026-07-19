# Roadmap Final — App de Notas (Enfoque Producto Real)

## PARTE I — BASE (Web)

### FASE 1 — Mockup Frontend (Angular)
- UI con data mock
- Pantallas: login, home, notas, respaldos
- Atomic design
- Temas
- Deploy

Resultado: UX validada

---

### FASE 2 — Core Backend (Spring Boot)
- Arquitectura limpia
- Users / Roles / Permisos
- JWT (Spring Security)
- Base de datos preparada:
  - UUID
  - Timestamps
  - Version
  - Soft delete

Resultado: Backend sólido

---

### FASE 3 — Dominio
- Messages (tipo chat)
- Categories (con color)
- Languages
- CRUD completo
- DTOs + manejo de errores

Resultado: API funcional

---

## PARTE II — EXPANSIÓN

### FASE 4 — Mobile sin Sync
- React Native
- Consumo de API
- Misma lógica que web

Resultado: App mobile funcional

---

### FASE 5 — Consistencia
- Alinear web + mobile
- Corregir bugs
- Validar flujos

Resultado: Sistema estable

---

### FASE 6 — Sincronización inteligente

Incluye:
- Sync por acción (CRUD)
- Sync al abrir app
- Polling cada cierto tiempo
- Botón “Sincronizar”

Backend:
- GET /sync?lastSync=...
- POST /sync
- Basado en last_modified_at y version

Resultado:
Sistema consistente, eficiente y listo para escalar

---

## PARTE III — USO REAL

### FASE 7 — Uso real
- Uso diario
- Detectar mejoras
- Iterar

Resultado: Producto validado

---

## PARTE IV — MEJORA CONTINUA

### FASE 8 — Optimización y mejoras
- Performance
- Queries
- UX
- Ajustes reales

Resultado: App pulida

---

## PARTE V — PROYECTOS FUTUROS

Esto NO se implementa en esta app:

- Kubernetes
- WebSockets
- Kafka
- Testing avanzado

Objetivo:
Experimentar sin afectar el producto principal

---

# Filosofía del proyecto

“Primero hago un producto sólido, luego experimento con tecnologías avanzadas aparte”

La clave del sistema está en la base de datos preparada desde el inicio:

- UUID
- timestamps
- versionado
- soft delete

Esto permite evolucionar sin romper el sistema.

---

# Conclusión

El enfoque prioriza:

1. Simplicidad
2. Funcionalidad real
3. Escalabilidad futura sin sobreingeniería

Se construye primero un producto usable, y luego se exploran tecnologías avanzadas en proyectos separados.
