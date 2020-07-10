import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, first, map, tap } from 'rxjs/operators';
import { CanvasService } from '../../core/services/canvas/canvas.service';

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
  canvas$: Observable<boolean>;
  canvasUrl$: Observable<string>;
  canvas;
  context;
  lastPos;

  constructor(
    private dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
    private canvasService: CanvasService,
  ) {}

  ngOnInit(): void {
    this.canvas$ = this.canvasService.canvas$;
    this.canvasUrl$ = this.canvasService.urlImageCanvas$;
    this.dialogTitle = this.data.dialogTitle;
    this.station = this.data.station;
    this.reservationForm = this.formBuilder.group({
      nom: ['Badjah', [Validators.required, Validators.minLength(3)]],
      prenom: ['Cédric', [Validators.required, Validators.minLength(3)]],
    });
    this.reservationForm.patchValue({ ...this.data.station });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.canvasService.urlImageCanvas$
      .pipe(
        map((res: any) => {
          return {
            ...res,
            ...this.station,
            ...this.reservationForm.value,
          };
        }),
        tap((res) => {
          console.log('les données et => ', res);
          return this.canvasService.emitCanvas(false);
        }),
        first(),
        finalize(() => {
          this.canvasService.emitCanvas(false);
          return this.onClose();
        }),
      )
      .subscribe();
  }
}
