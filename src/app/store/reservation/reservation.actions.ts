import { Action } from '@ngrx/store';
import { Reservation } from '../../core/models/reservation.model';

export enum ReservationActionTypes {
  LoadReservations = '[Reservation] Load Reservations',
  LoadReservationsSuccess = '[Reservation.effect] Load Reservations Success',
  CancelReservation = '[Reservation] Cancel Reservation',
  ConfirmCancelReservation = '[Reservation] Confirm Cancel Reservation',
  TimerLoaded = '[Reservation.effect] Timer left 20min loaded',
  ReservationActiveDetected = '[Reservation.effect] Detection of reservation',
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

export class ReservationActiveDetected implements Action {
  readonly type = ReservationActionTypes.ReservationActiveDetected;
  constructor(public payload: { isActive: string }) {}
}

export class TimerLoaded implements Action {
  readonly type = ReservationActionTypes.TimerLoaded;
  constructor(public payload: { timer: string }) {}
}
export type ReservationActions =
  | LoadReservations
  | LoadReservationsSuccess
  | CancelReservation
  | ConfirmCancelReservation
  | TimerLoaded
  | ReservationActiveDetected;
