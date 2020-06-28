import { Component, OnInit } from '@angular/core';
import { BikeService } from '../core/services/bike/bike.service';
import { Observable } from 'rxjs';
import { Bike } from '../core/models/bike.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'velooc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  total$: Observable<number>;
  stationOpen$: Observable<number>;
  stationClose$: Observable<number>;
  stationOthers$: Observable<number>;
  bikes$: Observable<Bike[]>;

  constructor(private bikeService: BikeService) {}

  ngOnInit(): void {
    this.loading$ = this.bikeService.loading$;
    this.loaded$ = this.bikeService.loaded$;
    this.total$ = this.bikeService.count$;
    this.bikes$ = this.bikeService.entities$.pipe(map((bikes) => bikes));
    this.stationOpen$ = this.bikeService.entities$.pipe(map((stations) => stations.filter((station) => station.status === 'OPEN').length));
    this.stationClose$ = this.bikeService.entities$.pipe(
      map((stations) => stations.filter((station) => station.status === 'CLOSED').length),
    );
    this.stationOthers$ = this.bikeService.entities$.pipe(
      map((stations) => stations.filter((station) => station.status !== 'CLOSED' && station.status !== 'OPEN').length),
    );
  }

  getColor(condition: string) {
    if (condition === 'OPEN') {
      return 'green';
    } else if (condition === 'CLOSED') {
      return 'red';
    } else {
      return 'gray';
    }
  }
}
