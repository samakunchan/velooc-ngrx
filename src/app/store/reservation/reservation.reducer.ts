import { ReservationActions, ReservationActionTypes } from './reservation.actions';

export const reservationFeatureKey = 'reservation';

export interface ReservationState {
  success: boolean;
  failure: boolean;
  data: any;
}

export const initialState: ReservationState = {
  success: true,
  failure: false,
  data: undefined,
};

export function reservationReducer(state = initialState, action: ReservationActions): ReservationState {
  switch (action.type) {
    case ReservationActionTypes.LoadReservationsSuccess:
      return {
        ...state,
        success: true,
        failure: false,
        data: action.payload.reservation,
      };
    case ReservationActionTypes.CancelReservation:
      return initialState;
    default:
      return state;
  }
}
