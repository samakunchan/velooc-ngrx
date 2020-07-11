import { MapState } from './map/map.reducer';
import { ReservationState } from './reservation/reservation.reducer';

export interface StoreState {
  map: MapState;
  canvas: CanvasState;
  reservation: ReservationState;
}

export { getUrl, urlLoaded, showButton } from './canvas/canvas.selectors';
export { success, failure } from './reservation/reservation.selectors';
