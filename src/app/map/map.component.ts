import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadMapsAndStations } from '../store/map/map.actions';
import { Store } from '@ngrx/store';
import { getOneStation, loaded } from '../store/map/map.selectors';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { Station } from '../core/models/station.model';
import { StoreState, success } from '../store/store';
import { checkIfActive, getReservation } from '../store/reservation/reservation.selectors';
import { ReservationCompleteComponent } from '../reservation-complete/reservation-complete.component';
import { DialogBuilder } from '../core/utils/dialogBuilder';


@Component({
  selector: 'velooc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  loaded$: Observable<boolean>;
  stationSelected$: Observable<Station>;
  reservationActives$: Observable<boolean>;
  isReservationActives$: Observable<string>;
  reservation$: Observable<Station>;

  constructor(private store: Store<StoreState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loaded$ = this.store.select(loaded);
    this.reservationActives$ = this.store.select(success);
    this.isReservationActives$ = this.store.select(checkIfActive);
    this.reservation$ = this.store.select(getReservation);
    this.store.dispatch(new LoadMapsAndStations());
    this.stationSelected$ = this.store.select(getOneStation);
  }

  onChooseStation(station: Station) {
    const dialogConfig = new DialogBuilder().withTitle('Réservation').withWidth('550px').withDatas(station).build();
    this.dialog.open(ReservationDialogComponent, dialogConfig).afterClosed();
  }

  showCompleteReservation(reservation) {
    const dialogConfig = new DialogBuilder().withTitle('Réservation').withWidth('550px').withDatas(reservation).build();

    this.dialog.open(ReservationCompleteComponent, dialogConfig).afterClosed();
  }
}
