import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Breed {
    id: number;
    name: string;
    reference_image_id?: string;
    origin?: string;
    life_span?: string;
    temperament?: string;
    affection_level?: number;
    energy_level?: number;
    image?: { id: string; url: string };
}
// Modelo de la respuesta de la API
@Injectable({ providedIn: 'root' })
export class BreedService {
    private readonly base = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    /** GET /breeds → listado completo */
    list(): Observable<Breed[]> {
        return this.http.get<Breed[]>(`${this.base}/breeds`).pipe(
            switchMap(raw =>
                forkJoin(
                    raw.map(b => {
                        if (b.image?.url) return of(b);                       // ya viene con foto
                        if (!b.reference_image_id) return of(b);              // sin foto conocida
                        return this.http.get<any>(`${this.base}/images/${b.reference_image_id}`)
                            .pipe(map(img => ({ ...b, image: { id: b.reference_image_id!, url: img.url } })));
                    })
                )
            )
        );
    }


    /** GET /breeds/search?q=akita → búsqueda por texto */
    search(query: string): Observable<Breed[]> {
        const params = new HttpParams().set('q', query);
        return this.http.get<Breed[]>(`${this.base}/breeds/search`, { params });
    }

    /** GET /images/search?breed_ids=⟨id⟩ → 1 imagen para la raza */
    imageByBreed(breedId: number): Observable<string> {
        const params = new HttpParams().set('breed_ids', breedId);
        return this.http
            .get<{ url: string }[]>(`${this.base}/images/search`, { params })
            .pipe(map(res => res[0]?.url || ''));
    }
}
