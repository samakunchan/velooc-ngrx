import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'velooc-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent implements OnInit {
  dialogTitle: string;
  station: any;
  reservationForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.station = this.data.station;
    this.reservationForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.reservationForm.patchValue({ ...this.data.station });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSubmit() {
    const reservation = {
      ...this.station,
      ...this.reservationForm.value
    };
    console.log(reservation);
  }
}
