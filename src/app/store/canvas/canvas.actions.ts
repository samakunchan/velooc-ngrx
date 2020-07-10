import { Action } from '@ngrx/store';

export enum CanvasActionTypes {
  StoreCanvas = '[Canvas] Store the image of canvas',
  ShowClearCanvasButton = '[Reservation] Show canvas button for clear',
  ClearCanvas = '[Canvas] Clear the canvas',
}

export class ShowClearCanvasButton implements Action {
  readonly type = CanvasActionTypes.ShowClearCanvasButton;
}

export class StoreCanvas implements Action {
  readonly type = CanvasActionTypes.StoreCanvas;
  constructor(public payload: { url: string }) { }
}

export class ClearCanvas implements Action {
  readonly type = CanvasActionTypes.ClearCanvas;
}

export type CanvasActions = ShowClearCanvasButton | StoreCanvas | ClearCanvas;

