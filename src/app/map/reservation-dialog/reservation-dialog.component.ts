import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, first, map, tap } from 'rxjs/operators';
import { CanvasService } from '../../core/services/canvas/canvas.service';
import { Store } from '@ngrx/store';
import { getUrl, showButton, StoreState, urlLoaded } from '../../store/store';
import { ClearCanvas } from '../../store/canvas/canvas.actions';
import { LoadReservations } from '../../store/reservation/reservation.actions';

@Component({
  selector: 'velooc-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationDialogComponent implements OnInit {
  dialogTitle: string;
  station: any;
  reservationForm: FormGroup;
  urlLoaded$: Observable<boolean>;
  showButton$: Observable<boolean>;
  canvas;
  context;
  lastPos;

  constructor(
    private dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private canvasService: CanvasService,
    private store: Store<StoreState>,
  ) {}

  ngOnInit(): void {
    this.urlLoaded$ = this.store.select(urlLoaded);
    this.showButton$ = this.store.select(showButton);
    this.dialogTitle = this.data.dialogTitle;
    this.station = this.data.datas;
    this.reservationForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.reservationForm.patchValue({ ...this.data.station });
  }

  onClose() {
    this.dialogRef.close();
  }

  redraw() {
    this.store.dispatch(new ClearCanvas());
  }

  onSubmit() {
    this.store
      .select(getUrl)
      .pipe(
        map((res) => {
          return {
            ...{ url: res },
            ...this.station,
            ...this.reservationForm.value,
          };
        }),
        tap((data) => this.store.dispatch(new LoadReservations({ data }))),
        first(),
        finalize(() => {
          this.canvasService.emitCanvas(false);
          return this.onClose();
        }),
      )
      .subscribe();
  }
}
