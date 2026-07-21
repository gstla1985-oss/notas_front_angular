# 18:22 - Bug: Copiar y Mover Notas No Funciona (403 / Deploy Desincronizado)

## Resumen del problema

La funcionalidad de **"Copiar a..."** y **"Mover a..."** notas fallaba consistentemente con error **HTTP 403** en producción, aunque crear y editar notas funcionaban perfectamente.

---

## Diagnóstico Real

### 1. Causa Principal: Deploy Desincronizado
El frontend en **GitHub Pages** servía el JavaScript compilado **antiguo** (que llamaba a `/copy-to` y `/move-to`). El código fuente local tenía los cambios correctos, pero **nunca se hizo `ng build` + `git push`**.

> `git status` mostraba `nothing to commit` porque el código fuente local estaba limpio, pero la carpeta `dist/` (que sirve GitHub Pages) era del build anterior.

### 2. Endpoints No Desplegados en Render
Los endpoints `/copy-to` y `/move-to` del backend existen en el código fuente local pero probablemente **tampoco estaban desplegados en Render** en el momento de las pruebas, lo que resultaba en respuesta 403.

### 3. Error de Bucle de IA
La IA intentó múltiples "fixes" al código sin nunca hacer el paso fundamental: **compilar y desplegar**. Cada intento parecía nuevo código pero el navegador seguía ejecutando el JS antiguo.

---

## Solución Implementada

### Frontend (`note.service.ts`)
Se reescribieron `copyToCategories` y `moveToCategories` para **no depender de endpoints especiales**:

- **Copiar** → `POST /api/notes` por cada categoría destino (mismo endpoint que crear nota)
- **Mover** → `POST /api/notes` × N destinos + `DELETE /api/notes/{id}` (mismos endpoints que crear + eliminar)

```typescript
// COPIAR: simplemente crea una nota nueva en cada destino
copyToCategories(...): Observable<any> {
  const requests = categoryIds.map(catId =>
    this.http.post<Note>(this.apiUrl, { categoryId: catId, title, body, noteType })
  );
  return forkJoin(requests).pipe(tap(() => this.loadNotes(...)));
}

// MOVER: crea en destinos + elimina original
moveToCategories(...): Observable<any> {
  return forkJoin(createRequests).pipe(
    switchMap(() => this.http.delete(`${this.apiUrl}/${id}`, ...)),
    tap(() => this.loadNotes(...))
  );
}
```

### Backend (`NoteController.java`)
Se agregaron logs con **SLF4J** en todos los endpoints para facilitar el debugging en Render:
```
[NoteController] POST /notes user=email@x.com categoryId=3 title=...
[NoteController] DELETE /notes/uuid-here OK
```

### Backend (`application.yml`)
Se desactivó el spam de Hibernate (`show-sql: false`) y se configuró:
```yaml
logging:
  level:
    org.hibernate.SQL: WARN         # ya no spam de SQL
    com.komodo.notas.controller: DEBUG  # logs útiles visibles
    com.komodo.notas.service: DEBUG
```

---

## Commits

| Repositorio | Commit |
|---|---|
| `notas_front_angular` | `84a9579` — fix: copy/move usando POST+DELETE basico, console.logs |
| `notas_back_springboot` | `c200e63` — fix: NoteController con logs debug, suprimir Hibernate |

---

## Lección Aprendida

> **Angular en GitHub Pages ≠ código fuente local.**  
> Siempre que se cambien archivos `.ts`, hay que: `ng build` → `git push` → esperar que GitHub Actions despliegue.  
> El `git status` limpio en el repo de fuentes NO garantiza que el sitio en producción tenga los cambios.
