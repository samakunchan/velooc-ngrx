import { Action } from '@ngrx/store';
import { GeoJson } from '../core/models/bike.model';

export enum MapActionTypes {
  LoadMapsAndStations = '[Map.page] Map loaded and stations loaded',
  MarkerClick = '[Map.user] Marker click',
}

export class LoadMapsAndStations implements Action {
  readonly type = MapActionTypes.LoadMapsAndStations;
}

export class MarkerClick implements Action {
  readonly type = MapActionTypes.MarkerClick;
  constructor(public payload: { geoJson: GeoJson }) {}
}

export type MapActions = LoadMapsAndStations | MarkerClick;
