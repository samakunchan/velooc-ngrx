import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { CanvasActionTypes, ShowClearCanvasButton } from './canvas.actions';
import { CanvasService } from '../../core/services/canvas/canvas.service';
import { Store } from '@ngrx/store';
import { StoreState } from '../store';

@Injectable()
export class CanvasEffects {
  @Effect({ dispatch: false })
  clearCanvas$ = this.actions$.pipe(
    ofType(CanvasActionTypes.ClearCanvas),
    switchMap(() => this.canvasService.clear()),
  );

  @Effect({ dispatch: false })
  getUrl$ = this.actions$.pipe(
    ofType(CanvasActionTypes.StoreCanvas),
    tap(() => this.store.dispatch(new ShowClearCanvasButton())),
  );

  constructor(private actions$: Actions, private canvasService: CanvasService, private store: Store<StoreState>) {}
}
