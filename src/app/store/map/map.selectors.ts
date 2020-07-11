import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MapState } from './map.reducer';

export const getMapState = createFeatureSelector<MapState>('map');

export const loaded = createSelector(getMapState, (state: MapState) => state.loaded);
export const getOneStation = createSelector(getMapState, (state: MapState) => state.station);
