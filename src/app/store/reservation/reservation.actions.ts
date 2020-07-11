import { Action } from '@ngrx/store';
import { Reservation } from '../../core/models/reservation.model';

export enum ReservationActionTypes {
  LoadReservations = '[Reservation] Load Reservations',
  LoadReservationsSuccess = '[Reservation] Load Reservations Success',
  CancelReservation = '[Reservation] Cancel Reservation',
  ConfirmCancelReservation = '[Reservation] Confirm Cancel Reservation',
}

export class LoadReservations implements Action {
  readonly type = ReservationActionTypes.LoadReservations;
  constructor(public payload: { data: any }) {}
}

export class LoadReservationsSuccess implements Action {
  readonly type = ReservationActionTypes.LoadReservationsSuccess;
  constructor(public payload: { reservation: Reservation }) {}
}

export class CancelReservation implements Action {
  readonly type = ReservationActionTypes.CancelReservation;
}

export class ConfirmCancelReservation implements Action {
  readonly type = ReservationActionTypes.ConfirmCancelReservation;
}
export type ReservationActions = LoadReservations | LoadReservationsSuccess | CancelReservation | ConfirmCancelReservation;
