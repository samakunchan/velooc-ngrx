import { ReservationActions, ReservationActionTypes } from './reservation.actions';

export const reservationFeatureKey = 'reservation';

export interface ReservationState {
  success: boolean;
  cancel: boolean;
  data: any;
  timer: string;
  isActive: string;
}

export const initialState: ReservationState = {
  success: true,
  cancel: false,
  data: undefined,
  timer: undefined,
  isActive: undefined,
};

export function reservationReducer(state = initialState, action: ReservationActions): ReservationState {
  switch (action.type) {
    case ReservationActionTypes.LoadReservationsSuccess:
      return {
        ...state,
        success: true,
        cancel: false,
        data: action.payload.reservation,
      };
    case ReservationActionTypes.CancelReservation:
      return {
        ...state,
        cancel: true,
      };
    case ReservationActionTypes.TimerLoaded:
      return {
        ...state,
        timer: action.payload.timer,
        isActive: 'yes',
      };
    case ReservationActionTypes.ReservationActiveDetected:
      return {
        ...state,
        isActive: action.payload.isActive,
      };
    case ReservationActionTypes.ConfirmCancelReservation:
      return initialState;
    default:
      return state;
  }
}
