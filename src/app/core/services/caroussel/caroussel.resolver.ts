import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CarousselService } from './caroussel.service';
import { filter, first, tap } from 'rxjs/operators';
import { StoreState } from '../../../store/store';
import { Store } from '@ngrx/store';
import { LoadReservationsSuccess } from '../../../store/reservation/reservation.actions';

@Injectable()
export class CarousselResolver implements Resolve<boolean> {
  constructor(private carousselService: CarousselService, private store: Store<StoreState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.carousselService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.carousselService.getAll();
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
