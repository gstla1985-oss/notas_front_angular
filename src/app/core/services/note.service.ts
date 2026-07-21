import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, forkJoin, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Note {
  id: string;
  categoryId: number | null;
  title: string;
  body: string;
  noteType: 'TEXT' | 'CHECKLIST';
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/notes`;

  notes = signal<Note[]>([]);
  loading = signal(false);
  activeCategoryId = signal<number | null>(null);

  loadNotes(categoryId: number | null = null): void {
    this.activeCategoryId.set(categoryId);
    this.loading.set(true);
    let url = this.apiUrl;
    if (categoryId !== null) {
      url += `?categoryId=${categoryId}`;
    }
    this.http.get<Note[]>(url).subscribe({
      next: (data) => { this.notes.set(data); this.loading.set(false); },
      error: (err) => { console.error('[NoteService] Error loading notes', err); this.loading.set(false); }
    });
  }

  createNote(categoryId: number | null, title: string, body: string, noteType: 'TEXT' | 'CHECKLIST'): Observable<Note> {
    console.log('[NoteService] createNote', { categoryId, title, body, noteType });
    return this.http.post<Note>(this.apiUrl, { categoryId, title, body, noteType }).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }

  updateNote(id: string, categoryId: number | null, title: string, body: string): Observable<Note> {
    console.log('[NoteService] updateNote', { id, categoryId });
    return this.http.put<Note>(`${this.apiUrl}/${id}`, { categoryId, title, body }).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }

  deleteNote(id: string): Observable<any> {
    console.log('[NoteService] deleteNote', id);
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }

  duplicateNote(id: string): Observable<Note> {
    return this.http.post<Note>(`${this.apiUrl}/${id}/duplicate`, {}).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }

  moveNote(id: string, targetCategoryId: number | null): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}/move`, { categoryId: targetCategoryId }).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }

  /**
   * COPIAR: POST /notes por cada categoría destino.
   * Misma operación que crear nota — no usa endpoints especiales.
   */
  copyToCategories(id: string, categoryIds: (number | null)[], title: string, body: string, noteType: 'TEXT' | 'CHECKLIST'): Observable<any> {
    console.log('[NoteService] copyToCategories INICIO', { id, categoryIds, title, body, noteType });
    if (categoryIds.length === 0) {
      console.warn('[NoteService] copyToCategories: no hay categorías destino');
      return new Observable(s => { s.next(null); s.complete(); });
    }
    const requests = categoryIds.map(catId => {
      console.log('[NoteService] copyToCategories: creando copia en categoryId =', catId);
      return this.http.post<Note>(this.apiUrl, { categoryId: catId, title, body, noteType });
    });
    return forkJoin(requests).pipe(
      tap(results => {
        console.log('[NoteService] copyToCategories ÉXITO', results);
        this.loadNotes(this.activeCategoryId());
      })
    );
  }

  /**
   * MOVER: POST /notes en categorías destino + DELETE /notes/{id} del original.
   * No usa endpoints especiales — solo create + delete.
   */
  moveToCategories(id: string, categoryIds: (number | null)[], title: string, body: string, noteType: 'TEXT' | 'CHECKLIST'): Observable<any> {
    console.log('[NoteService] moveToCategories INICIO', { id, categoryIds, title, body, noteType });
    if (categoryIds.length === 0) {
      console.warn('[NoteService] moveToCategories: no hay categorías destino');
      return new Observable(s => { s.next(null); s.complete(); });
    }
    const createRequests = categoryIds.map(catId => {
      console.log('[NoteService] moveToCategories: creando en categoryId =', catId);
      return this.http.post<Note>(this.apiUrl, { categoryId: catId, title, body, noteType });
    });
    return forkJoin(createRequests).pipe(
      tap(results => console.log('[NoteService] moveToCategories: copias creadas OK', results)),
      switchMap(() => {
        console.log('[NoteService] moveToCategories: eliminando original id =', id);
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
      }),
      tap(deleteResult => {
        console.log('[NoteService] moveToCategories: original eliminado OK', deleteResult);
        this.loadNotes(this.activeCategoryId());
      })
    );
  }
}
