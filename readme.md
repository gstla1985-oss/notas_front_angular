# Komodo Notas — Frontend

Aplicación de notas tipo chat con diseño premium y temático.

## Stack Tecnológico
- **Angular 21** (LTS)
- **TailwindCSS** (integrado nativamente)
- **TypeScript** (strict mode)

## Temas Visuales
- 💜 **Graple Amethyst** — Tonos púrpura, fondo lavanda claro, cristales amatista
- ❤️ **Cherry Ruby** — Dark mode, tonos rojo rubí y negro, cristales de rubí

## Pantallas
- Login / Iniciar Sesión
- Registro / Crear Cuenta
- Home / Notas (vista tipo chat)

## Desarrollo

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev
```

## Estructura del Proyecto
```
src/
├── app/
│   ├── core/          # Servicios singleton, guards
│   ├── shared/        # Componentes reutilizables (átomos, moléculas)
│   ├── features/      # Módulos por funcionalidad
│   ├── pages/         # Componentes de página (login, register, home)
│   └── models/        # Interfaces y tipos
├── assets/            # Imágenes, cristales decorativos
└── styles.css         # Estilos globales + Tailwind
```

## Fase Actual
**FASE 1 — Mockup Frontend** (datos mock, sin backend)


Correr api :
.\gradlew bootRun
