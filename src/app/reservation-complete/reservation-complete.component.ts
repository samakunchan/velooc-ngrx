import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reservation } from '../core/models/reservation.model';
import { Store } from '@ngrx/store';
import { cancel, StoreState } from '../store/store';
import { CancelReservation, ConfirmCancelReservation } from '../store/reservation/reservation.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'velooc-reservation-complete',
  templateUrl: './reservation-complete.component.html',
  styleUrls: ['./reservation-complete.component.scss'],
})
export class ReservationCompleteComponent implements OnInit {
  showReservation: Reservation;
  cancel$: Observable<boolean>;
  constructor(
    private dialogRef: MatDialogRef<ReservationCompleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private store: Store<StoreState>,
  ) {}

  ngOnInit(): void {
    this.showReservation = this.data.reservation;
    this.cancel$ = this.store.select(cancel);
  }

  onClose() {
    this.dialogRef.close();
  }

  onCancel() {
    this.store.dispatch(new CancelReservation());
  }

  onConfirm() {
    this.onClose();
    this.store.dispatch(new ConfirmCancelReservation());
  }
}
