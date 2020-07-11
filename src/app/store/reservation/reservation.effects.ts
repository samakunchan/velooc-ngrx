import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import {
  ConfirmCancelReservation,
  LoadReservations,
  LoadReservationsSuccess,
  ReservationActionTypes
} from './reservation.actions';
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

  @Effect({ dispatch: false })
  confirmCancelReservation$ = this.actions$.pipe(
    ofType<ConfirmCancelReservation>(ReservationActionTypes.ConfirmCancelReservation),
    tap(() => sessionStorage.clear()),
  );

  constructor(private actions$: Actions, private reservationService: ReservationService) {}
}
