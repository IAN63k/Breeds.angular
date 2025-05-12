import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BreedService } from '../../core/services/breed.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { Breed } from '../../core/models/breed.model';
import { CommonModule } from '@angular/common';

/* Angular Material ─ sólo los que usa el HTML */
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@Component({
    selector: 'app-favorites',
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,

        /* Material */
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
    displayed = ['image', 'name', 'origin', 'life_span', 'remove'];
    dataSource = new MatTableDataSource<Breed>([]);
    loading = true;

    constructor(private breeds: BreedService, private favs: FavoritesService) { }

    ngOnInit(): void {
        this.loadFavorites();
    }

    loadFavorites(): void {
        const ids = this.favs.list();
        if (!ids.length) {
            this.dataSource.data = [];
            this.loading = false;
            return;
        }

        /*  Estrategia sencilla: traemos todas las razas y filtramos por id  */
        this.breeds.list().subscribe(res => {
            this.dataSource.data = res.filter(b => ids.includes(b.id));
            this.loading = false;
        });
    }

    remove(b: Breed): void {
        this.favs.toggle(b.id);
        this.loadFavorites();
    }
}
