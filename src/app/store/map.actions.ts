import { Action } from '@ngrx/store';
import { LngLatBounds, LngLatLike } from 'mapbox-gl';

export enum MapActionTypes {
  LoadMapChanged = '[Map] map has changed',
  UpdateData = '[Map.data] update data',
  UpdateDataSuccess = '[Map.data] update data success',
  UpdateDataFailure = '[Map.data] update data failure',
  MarkerClick = '[Map.user] Marker click',
}

export class LoadMapChanged implements Action {
  readonly type = MapActionTypes.LoadMapChanged;
  constructor(public payload: { center: LngLatLike; bbox: LngLatBounds; zoom: number }) {}
}
export class UpdateData implements Action {
  readonly type = MapActionTypes.UpdateData;
}
export class UpdateDataSuccess implements Action {
  readonly type = MapActionTypes.UpdateDataSuccess;
  constructor(public payload: { geoJSON: any }) {}
}
export class UpdateDataFailure implements Action {
  readonly type = MapActionTypes.UpdateDataFailure;
}
export class MarkerClick implements Action {
  readonly type = MapActionTypes.MarkerClick;
  constructor(public payload: { coords: LngLatLike }) {}
}

export type MapActions = LoadMapChanged | UpdateData | UpdateDataSuccess | UpdateDataFailure | MarkerClick;
