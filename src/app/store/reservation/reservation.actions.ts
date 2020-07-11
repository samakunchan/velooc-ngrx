import { Action } from '@ngrx/store';
import { Reservation } from '../../core/models/reservation.model';

export enum ReservationActionTypes {
  LoadReservations = '[Reservation] Load Reservations',
  LoadReservationsSuccess = '[Reservation] Load Reservations Success',
  LoadReservationsFailure = '[Reservation] Load Reservations Failure',
}

export class LoadReservations implements Action {
  readonly type = ReservationActionTypes.LoadReservations;
  constructor(public payload: { data: any }) {}
}

export class LoadReservationsSuccess implements Action {
  readonly type = ReservationActionTypes.LoadReservationsSuccess;
  constructor(public payload: { reservation: Reservation }) {}
}

export class LoadReservationsFailure implements Action {
  readonly type = ReservationActionTypes.LoadReservationsFailure;
  constructor(public payload: { error: any }) {}
}

export type ReservationActions = LoadReservations | LoadReservationsSuccess | LoadReservationsFailure;
