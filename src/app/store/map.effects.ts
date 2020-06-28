import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, debounceTime } from 'rxjs/operators';
import { MapActionTypes, UpdateData } from './map.actions';

@Injectable()
export class MapEffects {
  @Effect()
  triggerUpdateEffect$ = this.actions$.pipe(
    ofType(MapActionTypes.LoadMapChanged),
    debounceTime(200),
    map(() => new UpdateData()),
  );

  constructor(private actions$: Actions) {}
}
