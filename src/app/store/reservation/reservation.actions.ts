import { Action } from '@ngrx/store';
import { Station } from '../../core/models/station.model';

export enum ReservationActionTypes {
  LoadReservations = '[Reservation] Load Reservations',
  LoadReservationsSuccess = '[Reservation] Load Reservations Success',
  LoadReservationsFailure = '[Reservation] Load Reservations Failure',
}

export class LoadReservations implements Action {
  readonly type = ReservationActionTypes.LoadReservations;
}

export class LoadReservationsSuccess implements Action {
  readonly type = ReservationActionTypes.LoadReservationsSuccess;
  constructor(public payload: { data: Station }) {}
}

export class LoadReservationsFailure implements Action {
  readonly type = ReservationActionTypes.LoadReservationsFailure;
  constructor(public payload: { error: any }) {}
}

export type ReservationActions = LoadReservations | LoadReservationsSuccess | LoadReservationsFailure;
