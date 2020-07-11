import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { LoadReservations, LoadReservationsSuccess, ReservationActionTypes } from './reservation.actions';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { Reservation } from '../../core/models/reservation.model';

@Injectable()
export class ReservationEffects {
  @Effect()
  loadReservationsSuccess$ = this.actions$.pipe(
    ofType<LoadReservations>(ReservationActionTypes.LoadReservations),
    switchMap((datas) =>
      this.reservationService
        .build(datas.payload.data)
        .pipe(map((reservation: Reservation) => new LoadReservationsSuccess({ reservation }))),
    ),
  );

  constructor(private actions$: Actions, private reservationService: ReservationService) {}
}
