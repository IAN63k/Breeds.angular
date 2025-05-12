import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BreedListComponent } from './breed-list/breed-list.component';
import { FavoritesComponent } from '../favorites/favorites.component';


const routes: Routes = [
  { path: '', component: BreedListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'breeds', component: BreedListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BreedListComponent,
    FavoritesComponent
    /* … */
  ]
})

export class BreedsModule { }



