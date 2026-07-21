# 05:14 - Eliminación de Categorías y Ajustes de Menú

**Fecha:** 21 de Julio de 2026

## Resumen de la tarea
Se implementó la funcionalidad para eliminar categorías con sus respectivas notas asociadas y se ajustaron los menús de la interfaz de usuario de acuerdo a los requerimientos:

1. **Ajuste Menú de 3 puntos (Header)**:
   - Se eliminó la opción "Cerrar Sesión" del menú de 3 puntos ubicado en la esquina superior derecha (cabecera).
   - Se agregó la opción **"Eliminar Categoría"** en este mismo menú. Este botón solo se muestra cuando se está en una categoría específica (no aparece en "General / Sin clasificar").

2. **Menú Contextual (Click Derecho)**:
   - Se añadió un menú contextual al hacer *click derecho* sobre cualquier categoría en el listado de la barra lateral (sidebar).
   - Este menú despliega la opción para **"Eliminar Categoría"**.

3. **Advertencia de Eliminación (Modal)**:
   - Al seleccionar la opción de eliminar categoría por cualquiera de las dos vías, se presenta un **modal de advertencia** que sigue la misma línea de diseño del aplicativo (Glassmorphism, colores, bordes redondeados).
   - El modal advierte explícitamente que se eliminará la categoría con **todas sus notas asociadas**.
   - Al confirmar, se envía la petición al backend (`moveNotes=false`) para asegurar que las notas internas también sean eliminadas lógicamente y se refresca el panel, regresando a la vista "General".
