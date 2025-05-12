import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreedService } from '../../../core/services/breed.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Breed } from '../../../core/models/breed.model';
import { FavoritesService } from '../../../core/services/favorites.service';

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
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BreedDetailDialogComponent } from '../components/breed-detail-dialog/breed-detail-dialog.component';


@Component({
  standalone: true,
  selector: 'app-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.css'],
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
    MatSnackBarModule,

    MatDialogModule
  ]
})
export class BreedListComponent implements AfterViewInit, OnDestroy {
  displayed = ['image', 'name', 'origin', 'life_span', 'favorite'];
  dataSource = new MatTableDataSource<Breed>([]);
  origins: string[] = [];
  filter = ''; origin = '';
  loading = true;
  isHandset$: Observable<boolean>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private sub = new Subscription();

  constructor(
    private breeds: BreedService,
    private favs: FavoritesService,
    private snack: MatSnackBar,
    private bp: BreakpointObserver,
    private dialog: MatDialog
  ) {
    this.isHandset$ = this.bp.observe(Breakpoints.Handset).pipe(map(r => r.matches));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.load();
  }

  load() {
    this.sub.add(
      this.breeds.list().subscribe({
        next: res => {
          this.dataSource.data = res;
          this.origins = Array.from(new Set(res.map(b => b.origin).filter((o): o is string => !!o))).sort();
          this.applyFilter();
          this.loading = false;
        },
        error: () => {
          this.snack.open('Error cargando razas', 'Cerrar', { duration: 4000 });
          this.loading = false;
        }
      })
    );
  }

  applyFilter() {
    this.dataSource.filterPredicate = (data, _) => {
      const f = this.filter.toLowerCase();
      const matchText = !f || data.name.toLowerCase().includes(f);
      const matchOrigin = !this.origin || data.origin === this.origin;
      return matchText && matchOrigin;
    };
    this.dataSource.filter = Math.random().toString(); // trigger
  }

  openDetail(b: Breed) {
    this.dialog.open(BreedDetailDialogComponent, {
      data: b,
      maxWidth: '600px',
      autoFocus: false
    });
  }

  toggleFav(b: Breed, evt?: MouseEvent) {
    evt?.stopPropagation();
    this.favs.toggle(b.id);
  }

  isFav(b: Breed) {
    return this.favs.isFav(b.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
