// 1)  Stand-alone wrapper que será tu nuevo shell
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesService } from '../../../../core/services/favorites.service';
import { BreedService } from '../../../../core/services/breed.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from '../top-bar/top-bar.component';


@Component({
  standalone: true,
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    TopBarComponent
  ]
})
export class ShellComponent {
  sidenavOpen$ = new BehaviorSubject<boolean>(false);

  /* TODO: Observable con los objetos Breed favoritos */
  // favBreeds$ = combineLatest([
  //   this.breeds.list(),
  //   this.favs.changes$            // ver sección 3
  // ]).pipe(
  //   map(([all, ids]) => all.filter(b => ids.includes(b.id)))
  // );

  constructor(private favs: FavoritesService, private breeds: BreedService) {}

  toggleSidenav() { this.sidenavOpen$.next(!this.sidenavOpen$.value); }
}
