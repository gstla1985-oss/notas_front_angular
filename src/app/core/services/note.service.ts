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
    return this.http.post<Note>(this.apiUrl, { categoryId, title, body, noteType }).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }

  updateNote(id: string, categoryId: number | null, title: string, body: string): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, { categoryId, title, body }).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }

  deleteNote(id: string): Observable<any> {
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
    if (categoryIds.length === 0) {
      return new Observable(s => { s.next(null); s.complete(); });
    }
    const requests = categoryIds.map(catId => {
      return this.http.post<Note>(this.apiUrl, { categoryId: catId, title, body, noteType });
    });
    return forkJoin(requests).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }

  /**
   * MOVER: POST /notes en categorías destino + DELETE /notes/{id} del original.
   * No usa endpoints especiales — solo create + delete.
   */
  moveToCategories(id: string, categoryIds: (number | null)[], title: string, body: string, noteType: 'TEXT' | 'CHECKLIST'): Observable<any> {
    if (categoryIds.length === 0) {
      return new Observable(s => { s.next(null); s.complete(); });
    }
    const createRequests = categoryIds.map(catId => {
      return this.http.post<Note>(this.apiUrl, { categoryId: catId, title, body, noteType });
    });
    return forkJoin(createRequests).pipe(
      switchMap(() => this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' })),
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }
}
