import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadMapsAndStations } from '../store/map/map.actions';
import { MapState } from '../store/map/map.reducer';
import { Store } from '@ngrx/store';
import { getOneStation, loaded } from '../store/map/map.selectors';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { Station } from '../core/models/station.model';

@Component({
  selector: 'velooc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  loaded$: Observable<boolean>;
  stationSelected$: Observable<Station>;

  constructor(private store: Store<MapState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loaded$ = this.store.select(loaded);
    this.store.dispatch(new LoadMapsAndStations());
    this.stationSelected$ = this.store.select(getOneStation);
  }

  onChooseStation(station: Station) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '550px';
    dialogConfig.data = {
      dialogTitle: 'Réservation',
      station,
    };
    this.dialog.open(ReservationDialogComponent, dialogConfig).afterClosed();
  }
}
