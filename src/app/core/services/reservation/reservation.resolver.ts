import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, first, tap } from 'rxjs/operators';
import { LoadReservationsSuccess } from '../../../store/reservation/reservation.actions';
import { Store } from '@ngrx/store';
import { StoreState, success } from '../../../store/store';
import { ReservationService } from './reservation.service';

@Injectable()
export class ReservationResolver implements Resolve<boolean> {
  constructor(private reservationService: ReservationService, private store: Store<StoreState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(success).pipe(
      tap(() => {
        if (sessionStorage.getItem('reservation')) {
          const reservation = JSON.parse(sessionStorage.getItem('reservation'));
          this.store.dispatch(new LoadReservationsSuccess({ reservation }));
        }
      }),
      filter((loaded) => !!loaded),
      first(),
    );
  }
}
