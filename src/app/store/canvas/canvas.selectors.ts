import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MyCanvasState } from './canvas.reducer';

export const getCanvasState = createFeatureSelector<MyCanvasState>('canvas');

export const getUrl = createSelector(getCanvasState, (state: MyCanvasState) => state.url);
export const urlLoaded = createSelector(getCanvasState, (state: MyCanvasState) => state.loaded);
export const showButton = createSelector(getCanvasState, (state: MyCanvasState) => state.showButton);
