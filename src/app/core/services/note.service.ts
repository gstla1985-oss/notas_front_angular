import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
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

  // Reactive state
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
      next: (data) => {
        this.notes.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading notes', err);
        this.loading.set(false);
      }
    });
  }

  createNote(categoryId: number | null, title: string, body: string, noteType: 'TEXT' | 'CHECKLIST'): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, { categoryId, title, body, noteType }).pipe(
      tap(() => this.loadNotes(this.activeCategoryId())) // Refresh list
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

  copyToCategories(id: string, categoryIds: (number | null)[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/copy-to`, { categoryIds }, { responseType: 'text' }).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }

  moveToCategories(id: string, categoryIds: (number | null)[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/move-to`, { categoryIds }, { responseType: 'text' }).pipe(
      tap(() => this.loadNotes(this.activeCategoryId()))
    );
  }
}
