import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs/operators';
import { MapActionTypes } from './map.actions';
import { MapService } from '../../core/services/map/map.service';

@Injectable()
export class MapEffects {
  @Effect({ dispatch: false })
  loadMapsAndStations$ = this.actions$.pipe(
    ofType(MapActionTypes.LoadMapsAndStations),
    mergeMap(() => this.mapService.initMap()),
    mergeMap((mapInfos) => this.mapService.loadStations(mapInfos)),
  );

  constructor(private actions$: Actions, private mapService: MapService) {}
}
