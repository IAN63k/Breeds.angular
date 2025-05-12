import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'breeds', pathMatch: 'full' },
  { path: 'breeds', loadChildren: () => import('./features/breeds/breeds.module').then(m => m.BreedsModule) },
  { path: '**', redirectTo: 'breeds' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
