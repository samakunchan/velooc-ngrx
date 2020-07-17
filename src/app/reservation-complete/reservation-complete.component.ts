import { ChangeDetectionStrategy, Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reservation } from '../core/models/reservation.model';
import { Store } from '@ngrx/store';
import { cancel, getTimer, StoreState } from '../store/store';
import { CancelReservation, ConfirmCancelReservation } from '../store/reservation/reservation.actions';
import { Observable, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'velooc-reservation-complete',
  templateUrl: './reservation-complete.component.html',
  styleUrls: ['./reservation-complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationCompleteComponent implements OnInit, OnDestroy {
  showReservation: Reservation;
  cancel$: Observable<boolean>;
  timer$: Observable<any>;
  message = 'loading...';
  constructor(
    private dialogRef: MatDialogRef<ReservationCompleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private store: Store<StoreState>,
  ) {}

  ngOnInit(): void {
    this.showReservation = this.data.datas;
    this.cancel$ = this.store.select(cancel);
    this.timer$ = interval(1000).pipe(
      switchMap(() => this.store.select(getTimer)),
      map((timer) => {
        if (timer) {
          const minutes = 20;
          const minInMs = minutes * 60 * 1000;
          const time = Date.now() - Number(timer);
          const timeRemain = minInMs - time;

          const minutesRemain = String(Math.floor(timeRemain / 1000 / 60));
          let secondsRemain: string = String(Math.floor((timeRemain / 1000) % 60));
          if (secondsRemain.length === 1) {
            secondsRemain = `0${secondsRemain}`;
          }
          if (time < minInMs) {
            return minutesRemain + 'min ' + secondsRemain + 's';
          } else {
            this.store.dispatch(new ConfirmCancelReservation());
            this.message = 'Expiré';
            sessionStorage.clear();
          }
        }
      }),
    );
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

  ngOnDestroy(): void {}
}
