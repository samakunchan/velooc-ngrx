import { LngLatBounds, LngLatLike } from 'mapbox-gl';
import { MapActions, MapActionTypes } from './map.actions';

export const mapFeatureKey = 'map';

export interface MapState {
  center: LngLatLike;
  zoom: number;
  bbox: LngLatBounds;
  geoJSON: any;
}

export const initialState: MapState = {
  center: {
    lat: 45.464211,
    lng: 9.191383,
  },
  zoom: 13,
  bbox: undefined,
  geoJSON: {},
};

export function mapReducer(state = initialState, action: MapActions): MapState {
  switch (action.type) {
    case MapActionTypes.LoadMapChanged:
      return {
        ...state,
        center: action.payload.center,
        zoom: action.payload.zoom,
        bbox: action.payload.bbox,
      };
    case MapActionTypes.UpdateDataSuccess:
      return {
        ...state,
        geoJSON: action.payload.geoJSON,
      };
    default:
      return state;
  }
}
