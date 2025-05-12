import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private key = 'favoriteBreeds';
    private _changes = new BehaviorSubject<number[]>(this.list());

    /** Observable público */
    changes$ = this._changes.asObservable();

    list(): number[] {
        return JSON.parse(localStorage.getItem(this.key) || '[]');
    }

    toggle(id: number) {
        const now = new Set(this.list());
        now.has(id) ? now.delete(id) : now.add(id);
        localStorage.setItem(this.key, JSON.stringify([...now]));
        this._changes.next([...now]);             // 🔔 emite cambio
    }

    isFav(id: number) { return this.list().includes(id); }
}
