import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Category {
  id: number;
  name: string;
  color: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categories`;

  // Reactive state
  categories = signal<Category[]>([]);
  loading = signal(false);

  loadCategories(): void {
    this.loading.set(true);
    this.http.get<Category[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.categories.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading categories', err);
        this.loading.set(false);
      }
    });
  }

  createCategory(name: string, color: string): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, { name, color }).pipe(
      tap(() => this.loadCategories()) // Refresh list
    );
  }

  updateCategory(id: number, name: string, color: string): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, { name, color }).pipe(
      tap(() => this.loadCategories())
    );
  }

  deleteCategory(id: number, moveNotes: boolean = true): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}?moveNotes=${moveNotes}`, { responseType: 'text' }).pipe(
      tap(() => this.loadCategories())
    );
  }
}
