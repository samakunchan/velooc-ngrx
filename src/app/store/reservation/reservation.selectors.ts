import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservationState } from './reservation.reducer';

export const getReservationtate = createFeatureSelector<ReservationState>('reservation');

export const success = createSelector(getReservationtate, (state: ReservationState) => state.success);
export const cancel = createSelector(getReservationtate, (state: ReservationState) => state.cancel);
export const getReservation = createSelector(getReservationtate, (state: ReservationState) => state.data);
export const getTimer = createSelector(getReservationtate, (state: ReservationState) => state.timer);
export const checkIfActive = createSelector(getReservationtate, (state: ReservationState) => state.isActive);
