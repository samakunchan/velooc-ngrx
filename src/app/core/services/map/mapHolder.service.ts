import { Injectable } from '@angular/core';
import { Map, LngLatLike } from 'mapbox-gl';

@Injectable()
export class MapHolderService {
  public map: Map;

  setMapRef(map: Map) {
    this.map = map;
  }

  flyTo(center: LngLatLike, zoom: number) {
    this.map.flyTo({ center, zoom });
  }
}
