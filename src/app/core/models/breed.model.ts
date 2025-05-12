export interface Breed {
  id: number;
  name: string;
  bred_for?: string;
  breed_group?: string;
  temperament?: string;
  origin?: string;
  life_span?: string;
  energy_level?: number;   // campo custom → lo calcularemos si no existe
  affection_level?: number; // idem
  image?: { id: string; url: string };
}
