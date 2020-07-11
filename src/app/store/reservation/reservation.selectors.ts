import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReservationState } from './reservation.reducer';

export const getReservationtate = createFeatureSelector<ReservationState>('reservation');

export const success = createSelector(getReservationtate, (state: ReservationState) => state.success);
export const failure = createSelector(getReservationtate, (state: ReservationState) => state.failure);
export const getReservation = createSelector(getReservationtate, (state: ReservationState) => state.data);
