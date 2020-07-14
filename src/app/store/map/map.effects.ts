import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { LoadMapsAndStations, MapActionTypes, MarkerClick } from './map.actions';
import { MapService } from '../../core/services/map/map.service';
import { ReservationService } from '../../core/services/reservation/reservation.service';
import { ReservationActiveDetected } from '../reservation/reservation.actions';

@Injectable()
export class MapEffects {
  @Effect({ dispatch: false })
  loadMapsAndStations$ = this.actions$.pipe(
    ofType<LoadMapsAndStations>(MapActionTypes.LoadMapsAndStations),
    mergeMap(() => this.mapService.initMap()),
    mergeMap((mapInfos) => this.mapService.loadStations(mapInfos)),
  );

  @Effect()
  markerClick$ = this.actions$.pipe(
    ofType<MarkerClick>(MapActionTypes.MarkerClick),
    switchMap(() => this.reservationService.checkReservation().pipe(map((isActive) => new ReservationActiveDetected({ isActive })))),
  );

  constructor(private actions$: Actions, private mapService: MapService, private reservationService: ReservationService) {}
}
