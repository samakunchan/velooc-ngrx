import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reservation } from '../core/models/reservation.model';
import { Store } from '@ngrx/store';
import { StoreState } from '../store/store';
import { CancelReservation } from '../store/reservation/reservation.actions';

@Component({
  selector: 'velooc-reservation-complete',
  templateUrl: './reservation-complete.component.html',
  styleUrls: ['./reservation-complete.component.scss'],
})
export class ReservationCompleteComponent implements OnInit {
  showReservation: Reservation;
  constructor(
    private dialogRef: MatDialogRef<ReservationCompleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private store: Store<StoreState>,
  ) {}

  ngOnInit(): void {
    this.showReservation = this.data.reservation;
  }

  onClose() {
    this.dialogRef.close();
  }

  onCancel() {
    this.store.dispatch(new CancelReservation());
    this.onClose();
  }
}
