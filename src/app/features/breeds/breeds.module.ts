import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BreedListComponent } from './breed-list/breed-list.component';
import { FavoritesComponent } from '../favorites/favorites.component';
import { ShellComponent } from './components/shell/shell.component';
  

const routes: Routes = [
  { path: '', component: BreedListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'shell', component: ShellComponent }
  { path: 'breeds', component: BreedListComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    BreedListComponent,
    FavoritesComponent,
    ShellComponent
  ]
})

export class BreedsModule { }



