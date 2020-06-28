import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LngLatLike, LngLatBounds } from 'mapbox-gl';
import { MapState } from '../../../store/map.reducer';
import { LoadMapChanged, MarkerClick } from '../../../store/map.actions';
import { getCurrentBBox, getCurrentCenter, getCurrentZoom, getGeoJSON, getMapState } from '../../../store/map.selectors';

@Injectable()
export class MapFacadeService {
  mapState$: Observable<MapState>;
  center$: Observable<LngLatLike>;
  zoom$: Observable<number>;
  bbox$: Observable<LngLatBounds>;
  geoJSON$: Observable<any>;

  constructor(private store: Store<any>) {
    this.mapState$ = this.store.select(getMapState);
    this.center$ = this.store.select(getCurrentCenter);
    this.zoom$ = this.store.select(getCurrentZoom);
    this.bbox$ = this.store.select(getCurrentBBox);
    this.geoJSON$ = this.store.select(getGeoJSON);
  }

  clickOnMarker(coords: LngLatLike) {
    this.store.dispatch(new MarkerClick({ coords }));
  }

  mapChanged(bbox: LngLatBounds, center: LngLatLike, zoom: number) {
    // console.log(bbox, center, zoom);
    this.store.dispatch(
      new LoadMapChanged({
        bbox,
        center,
        zoom,
      }),
    );
  }
}
