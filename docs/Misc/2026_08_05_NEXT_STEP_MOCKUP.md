# Plan de Trabajo: Mockup Frontend - Komodo Notas

## 1. Objetivo General
Crear una maqueta (mockup) funcional y altamente estética del frontend de la aplicación de notas, utilizando datos locales (mock) para validar la experiencia de usuario (UX) y el diseño visual antes de proceder con la implementación del backend.

## 2. Stack Tecnológico
*   **Framework:** Angular (Versión estable más moderna, ej: v21/v22 según estabilidad).
*   **Estilos:** TailwindCSS (para diseño rápido y sistema de temas).
*   **Iconografía:** Lucide Angular o FontAwesome.
*   **Arquitectura:** Atomic Design (Átomos, Moléculas, Organismos).

## 3. Alcance del Mockup (Fase 1)

### Pantallas a Implementar
1.  **Login / Iniciar Sesión:**
    *   Interfaz responsive con fondo decorativo (cristales).
    *   Campos de email y contraseña (solo visuales).
    *   **Lógica Mock:** Al presionar "Iniciar Sesión", navegar directamente al Home sin validación real.
    *   Botón de cambio de tema (Amethyst / Ruby).
2.  **Registro / Crear Cuenta:**
    *   Formulario con nombre, email y contraseña.
    *   **Lógica Mock:** Navegar al Home al "Registrar".
3.  **Home / Notas (Vista Principal):**
    *   Layout tipo chat con sidebar de categorías y contenedor de mensajes.
    *   Buscador funcional (con data mock).
    *   Input inferior para "escribir nota".
    *   Botón de cambio de tema persistente.

### Temas Visuales
Se implementarán los dos diseños iniciales:
*   **Graple Amethyst:** Tonos púrpura, cristales amatista, estética elegante y mística.
*   **Cherry Ruby:** Tonos rojo rubí y negro, estética premium y energética.

## 4. Requisitos Funcionales del Mockup
*   **Responsividad:** La aplicación debe adaptarse perfectamente a móviles y escritorio.
*   **Navegación:** Uso de `Angular Router` para transiciones entre pantallas.
*   **Sistema de Temas:** Implementación de clases de Tailwind dinámicas o variables CSS para alternar entre Amethyst y Ruby mediante un botón global.

## 5. Próximos Pasos Técnicos
1.  Inicializar proyecto Angular en el repositorio `notas_front`.
2.  Configurar TailwindCSS y estructura de carpetas (Core, Shared, Features).
3.  Definir la paleta de colores en `tailwind.config.js` para los temas Ruby y Amethyst.
4.  Construir componentes base (Átomos).
5.  Maquetar pantallas según los diseños de referencia.

## 6. Detalle de Diseño: Graple Amethyst (Versión Web)

Basado en las referencias visuales, el tema **Graple Amethyst** debe seguir estas directrices estéticas precisas utilizando **TailwindCSS**:

### Paleta de Colores y Fondos
*   **Fondo Principal:** Lavanda muy claro (`#F3E8FF` aprox.) con un gradiente sutil.
*   **Acentos:** Púrpura vibrante (`#7E22CE`) para botones primarios y estados activos.
*   **Decoración:** Uso de imágenes de clusters de cristales (amatistas) en las esquinas de la pantalla y dentro de los contenedores para reforzar la temática mística/premium.

### Componentes de Interfaz
*   **Tarjetas y Contenedores:** 
    *   Esquinas muy redondeadas (`rounded-3xl` o `rounded-2xl`).
    *   Bordes sutiles y sombras suaves para dar profundidad.
    *   Uso de **Glassmorphism**: Fondos ligeramente translúcidos en modales y barras laterales.
*   **Botones:** 
    *   Botón principal con ícono (ej. huella de mascota o cristales) y texto centrado.
    *   Botones secundarios (como "Continuar con Google") con fondo blanco y bordes definidos.
*   **Sidebar (Home):**
    *   Íconos circulares para categorías.
    *   Indicadores de estado (ej. "jueves", "Tú: ...").
    *   Efecto de selección con fondo púrpura suave y texto en contraste.
*   **Área de Chat (Notas):**
    *   Burbujas de mensaje con fondo blanco y bordes redondeados.
    *   Soporte visual para archivos adjuntos (íconos de tipo de archivo, tamaño y nombre).
    *   Líneas de tiempo ("Hoy") centradas y sutiles.
    *   Input de texto con íconos de "Adjuntar", "Micrófono" y "Enviar".

### Tipografía y Legibilidad
*   **Fuente:** Una sans-serif moderna y limpia (ej. Inter o Roboto).
*   **Jerarquía:** Títulos en negrita y color púrpura oscuro; textos de apoyo en gris oscuro para mantener el equilibrio visual.

## 7. Detalle de Diseño: Graple Amethyst (Versión Mobile)

La adaptación móvil debe maximizar el espacio vertical y mantener la coherencia visual con la versión web, ajustando los elementos interactivos para el uso con pulgares:

### Navegación y Layout
*   **Barra de Navegación Inferior:** 
    *   Tres secciones: "Chats", "Novedades" y "Llamadas".
    *   Íconos de línea fina con etiquetas de texto.
    *   Indicador de sección activa con una burbuja de fondo púrpura suave tras el ícono.
*   **Botones de Acción Flotantes (FAB):** 
    *   En la lista de notas: Un botón cuadrado con esquinas redondeadas para "Nueva carpeta/nota".
    *   En el chat: Un botón circular grande con ícono de micrófono para notas de voz.
*   **Header:** Título de sección a la izquierda ("Notas") y menú de opciones (tres puntos) a la derecha.

### Interfaz de Chat (Mobile)
*   **Burbujas de Mensaje:**
    *   **Enviados:** Alineados a la derecha con fondo púrpura muy claro y doble check de lectura.
    *   **Recibidos:** Alineados a la izquierda con fondo blanco/grisáceo sutil.
    *   Esquinas redondeadas asimétricas para indicar la dirección del mensaje.
*   **Barra de Entrada:**
    *   Input redondeado con íconos internos para emoji, adjuntos y cámara.
    *   Micrófono/Enviar posicionado externamente a la derecha para fácil acceso.

### Estética en Pantalla Completa
*   **Cristales:** Los clusters de amatista se posicionan de forma estratégica en las esquinas opuestas (superior derecha e inferior izquierda) para enmarcar el contenido sin obstruir la lectura.
*   **Lista de Chats:** Espaciado generoso entre items (`py-4`) para evitar toques accidentales.

## 8. Detalle de Diseño: Cherry Ruby (Versión Web)

El tema **Cherry Ruby** ofrece una experiencia "Dark Mode" premium y energética, utilizando contrastes profundos y efectos de brillo:

### Paleta de Colores y Atmósfera
*   **Fondo Principal:** Negro burdeos (`#0F0505` aprox.) con gradientes hacia rojo oscuro.
*   **Acentos:** Rojo rubí brillante (`#E11D48` o `#BE123C`) para elementos interactivos y estados de selección.
*   **Efecto de Brillo (Glow):** Uso de sombras paralelas (`box-shadow`) con color rojo sutil para simular el brillo de los cristales en botones y tarjetas seleccionadas.

### Componentes de Interfaz (Cherry Ruby)
*   **Tarjetas (Cards):** 
    *   Fondos en rojo muy oscuro con opacidad sutil.
    *   Bordes finos con un ligero resplandor rojo en el login y registro.
*   **Sidebar (Home):**
    *   **Selección:** El item activo se destaca con un borde rojo brillante y un gradiente interno.
    *   **Íconos:** Gemas de rubí circulares en lugar de íconos planos, reforzando la temática.
*   **Área de Chat:**
    *   **Burbujas:** Fondo rojo oscuro translúcido. Una característica única es el uso de mini-clusters de cristales rojos en la esquina superior derecha de los contenedores de mensajes destacados.
    *   **Input:** Barra inferior con íconos en rojo vibrante y botón "+" con efecto de aura roja.

### Decoración y Acabados
*   **Cristales:** Al igual que en Amethyst, los clusters de rubí se ubican en las esquinas, pero con una saturación mayor para resaltar sobre el fondo oscuro.
*   **Transiciones:** Las transiciones entre el tema Amethyst y Ruby deben ser suaves, cambiando las variables de color de Tailwind de forma global.

## 9. Detalle de Diseño: Cherry Ruby (Versión Mobile)

La versión móvil de Cherry Ruby intensifica la estética "Dark Mode" para pantallas OLED, centrando la atención en los elementos de color rojo rubí:

### Elementos de Identidad Visual
*   **Logo y Branding:** El ícono de la aplicación (libro con pluma) en login/registro presenta un **aura de resplandor rojo** (`drop-shadow`) que lo hace destacar sobre el fondo oscuro.
*   **Cristales en Mobile:** Se mantienen los clusters en las esquinas (superior derecha e inferior izquierda), adaptando su tamaño para no interferir con la barra de estado del celular o la navegación inferior.

### Interfaz de Navegación (Mobile Ruby)
*   **Barra Inferior:** 
    *   Fondo oscuro translúcido.
    *   La sección activa ("Chats") se resalta con una cápsula de fondo rojo oscuro.
    *   Íconos y etiquetas en tonos rojos/rosados suaves.
*   **Botones Flotantes (FAB):** 
    *   Botón de nueva nota y micrófono con gradientes de rojo vibrante a rojo oscuro.
*   **Lista de Notas:** 
    *   El item seleccionado utiliza un fondo con opacidad baja pero con un borde izquierdo o resplandor que indica el foco.

### Experiencia de Chat (Mobile Ruby)
*   **Burbujas:**
    *   **Mensajes Enviados:** Fondo rojo oscuro intenso con texto claro y checks en rojo brillante.
    *   **Mensajes Recibidos:** Fondo casi negro/gris oscuro para diferenciar claramente la autoría.
*   **Controles de Chat:** Íconos de adjuntar y cámara en rojo vibrante para una rápida identificación visual.
