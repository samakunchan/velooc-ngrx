import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadMapsAndStations } from '../store/map.actions';
import { MapState } from '../store/map.reducer';
import { Store } from '@ngrx/store';
import { getOneMarker, loaded } from '../store/map.selectors';


@Component({
  selector: 'velooc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  loaded$: Observable<boolean>;
  stationSelected$: Observable<any>;

  constructor(private store: Store<MapState>) {}

  ngOnInit(): void {
    this.loaded$ = this.store.select(loaded);
    this.store.dispatch(new LoadMapsAndStations());
    this.stationSelected$ = this.store.select(getOneMarker);
  }
}
