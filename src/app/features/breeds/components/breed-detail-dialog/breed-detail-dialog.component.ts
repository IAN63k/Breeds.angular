import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Breed } from '../../../../core/models/breed.model';

@Component({
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  selector: 'app-breed-detail-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.name }}</h2>

    <mat-dialog-content class="content">
      <img
        [src]="data.image?.url || 'https://cdn2.thedogapi.com/images/' + data.id + '.jpg'"
        alt="{{ data.name }}"
      />

      <table>
        <tr><th>ID:</th><td>{{ data.id }}</td></tr>
        <tr><th>Grupo:</th><td>{{ data.breed_group || '—' }}</td></tr>
        <tr><th>Origen:</th><td>{{ data.origin || '—' }}</td></tr>
        <tr><th>Esperanza de vida:</th><td>{{ data.life_span }}</td></tr>
        <tr><th>Temperamento:</th><td>{{ data.temperament }}</td></tr>
        <tr><th>Propósito:</th><td>{{ data.bred_for || '—' }}</td></tr>
        <tr><th>Nivel de energía:</th><td>{{ data.energy_level ?? '—' }}</td></tr>
        <tr><th>Nivel de afecto:</th><td>{{ data.affection_level ?? '—' }}</td></tr>
      </table>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content { display:flex; gap:1rem; }
    img { width:160px; height:160px; object-fit:cover; border-radius:8px; flex-shrink:0; }
    table { font-size:.875rem; border-collapse:collapse; }
    th { text-align:right; padding-right:.5rem; color:#666; white-space:nowrap; }
    td { padding:.2rem 0; }
  `]
})
export class BreedDetailDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Breed,
    private dialogRef: MatDialogRef<BreedDetailDialogComponent>
  ) {}
  
}
