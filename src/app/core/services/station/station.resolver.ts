import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, first, tap } from 'rxjs/operators';
import { StationService } from './station.service';
import { LoadReservationsSuccess } from '../../../store/reservation/reservation.actions';
import { Store } from '@ngrx/store';
import { StoreState } from '../../../store/store';

@Injectable()
export class StationResolver implements Resolve<boolean> {
  constructor(private stationService: StationService, private store: Store<StoreState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.stationService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.stationService.getAll();
        }
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
