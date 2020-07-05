import { MapActions, MapActionTypes } from './map.actions';
import { GeoJson } from '../core/models/bike.model';

export const mapFeatureKey = 'map';

export interface MapState {
  geoJson: GeoJson;
  loading: boolean;
  loaded: boolean;
}

export const initialState: MapState = {
  geoJson: undefined,
  loading: true,
  loaded: false,
};

export function mapReducer(state = initialState, action: MapActions): MapState {
  switch (action.type) {
    case MapActionTypes.LoadMapsAndStations:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case MapActionTypes.MarkerClick:
      return {
        ...state,
        geoJson: action.payload.geoJson,
      };
    default:
      return state;
  }
}
