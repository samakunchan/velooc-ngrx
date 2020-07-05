import { MapActions, MapActionTypes } from './map.actions';
import { Station } from '../core/models/station.model';

export const mapFeatureKey = 'map';

export interface MapState {
  station: Station;
  loading: boolean;
  loaded: boolean;
}

export const initialState: MapState = {
  station: undefined,
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
        station: action.payload.station,
      };
    default:
      return state;
  }
}
