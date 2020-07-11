import { Station } from './station.model';

export interface Reservation {
  nom: string;
  prenom: string;
  url: string;
  station: Station;
}
