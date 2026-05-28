import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Nota, NotaFirebase } from '../models/note.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private http = inject(HttpClient);
  private baseUrl = environment.firebaseUrl;

  /**
   * Obtiene todas las notas desde Firebase Realtime Database via REST API
   */
  getNotas(): Observable<Nota[]> {
    return this.http.get<{ [key: string]: NotaFirebase }>(`${this.baseUrl}/notas.json`).pipe(
      map(response => {
        if (!response) return [];
        return Object.entries(response).map(([id, data]) => ({
          id,
          ...data
        }));
      }),
      catchError(error => {
        console.error('Error al obtener notas:', error);
        return throwError(() => new Error('No se pudieron cargar las notas'));
      })
    );
  }

  /**
   * Obtiene una nota por su ID
   */
  getNota(id: string): Observable<Nota> {
    return this.http.get<NotaFirebase>(`${this.baseUrl}/notas/${id}.json`).pipe(
      map(data => ({ id, ...data })),
      catchError(error => {
        console.error('Error al obtener nota:', error);
        return throwError(() => new Error('No se pudo cargar la nota'));
      })
    );
  }

  /**
   * Crea una nueva nota en Firebase (POST)
   */
  crearNota(nota: Omit<Nota, 'id'>): Observable<Nota> {
    const ahora = new Date().toISOString();
    const nuevaNota: NotaFirebase = {
      titulo: nota.titulo || 'Sin título',
      contenido: nota.contenido || '',
      fechaCreacion: ahora,
      fechaActualizacion: ahora
    };

    return this.http.post<{ name: string }>(`${this.baseUrl}/notas.json`, nuevaNota).pipe(
      map(response => ({
        id: response.name,
        ...nuevaNota
      })),
      catchError(error => {
        console.error('Error al crear nota:', error);
        return throwError(() => new Error('No se pudo crear la nota'));
      })
    );
  }

  /**
   * Actualiza una nota existente en Firebase (PUT)
   */
  actualizarNota(id: string, cambios: Partial<NotaFirebase>): Observable<Nota> {
    const actualizacion: Partial<NotaFirebase> = {
      ...cambios,
      fechaActualizacion: new Date().toISOString()
    };

    return this.http.patch<NotaFirebase>(`${this.baseUrl}/notas/${id}.json`, actualizacion).pipe(
      map(data => ({ id, ...data })),
      catchError(error => {
        console.error('Error al actualizar nota:', error);
        return throwError(() => new Error('No se pudo actualizar la nota'));
      })
    );
  }

  /**
   * Elimina una nota de Firebase (DELETE)
   */
  eliminarNota(id: string): Observable<null> {
    return this.http.delete<null>(`${this.baseUrl}/notas/${id}.json`).pipe(
      catchError(error => {
        console.error('Error al eliminar nota:', error);
        return throwError(() => new Error('No se pudo eliminar la nota'));
      })
    );
  }
}
