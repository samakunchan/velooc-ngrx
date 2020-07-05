import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { environment } from '../../../../environments/environment';
import { mapInitInfos } from '../../models/map.model';
import { of } from 'rxjs';
import { BikeDataService } from '../bike/bike-data.service';
import { map, tap } from 'rxjs/operators';
import { Bike } from '../../models/bike.model';
import { MapState } from '../../../store/map.reducer';
import { Store } from '@ngrx/store';
import { MarkerClick } from '../../../store/map.actions';

@Injectable()
export class MapService {
  constructor(private bikeDataService: BikeDataService, private store: Store<MapState>) {}

  initMap() {
    mapboxgl.accessToken = environment.mapBoxAccessToken;
    if (mapInitInfos.container) {
      const mapboxInit = new mapboxgl.Map(mapInitInfos);
      return of({ mapboxInit });
    }
  }

  loadStations(data) {
    return this.bikeDataService.getAll().pipe(
      map((bikes) =>
        bikes.map((bike: Bike, index: number) => {
          return {
            type: 'features',
            properties: {
              id: index,
              description: `
                <h3>${bike.name}</h3>
                <h4>Vélo disponible: ${bike.available_bikes}</h4>
                <h4>OUVERT</h4>
                <h4>Adresse: ${bike.address}, ${bike.address2}</h4>
                <h4>Commune: ${bike.commune}</h4>
                <h4>Dernière mise à jour: ${bike.last_update}</h4>
                `
              ,
              number: bike.number,
              address: bike.address,
              address2: bike.address2,
              availability: bike.availability,
              bikes_stand: bike.bikes_stand,
              available_bikes: bike.available_bikes,
              available_bikes_stand: bike.available_bikes_stand,
              commune: bike.commune,
              name: bike.name,
              status: bike.status,
              last_update: bike.last_update,
            },
            geometry: {
              type: 'Point',
              coordinates: [bike.lng, bike.lat],
            },
          };
        }),
      ),
      tap((features) => {
        const closed = features.filter((feature) => feature.properties.status === 'CLOSED');
        const open = features.filter((feature) => feature.properties.status === 'OPEN');
        if (open) {
          data.mapboxInit.loadImage('assets/img/pin-blue.png', (error, image) => {
            if (error) {
              throw error;
            }
            data.mapboxInit.addLayer({
              id: 'places',
              type: 'symbol',
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [...open],
                },
              },
              layout: {
                'icon-image': 'marqueurVelo',
                'icon-size': 1,
              },
            });
            data.mapboxInit.addImage('marqueurVelo', image);
          });
        }

        if (closed) {
          data.mapboxInit.loadImage('assets/img/pin-red.png', (error, image) => {
            if (error) {
              throw error;
            }
            data.mapboxInit.addLayer({
              id: 'placesclosed',
              type: 'symbol',
              source: {
                type: 'geojson',
                data: {
                  type: 'FeatureCollection',
                  features: [...closed],
                },
              },
              layout: {
                'icon-image': 'marqueurVeloRed',
                'icon-size': 1,
              },
            });
            data.mapboxInit.addImage('marqueurVeloRed', image);
          });
        }

        this.onclickMarker(data);
      }),
    );
  }

  onclickMarker(data) {
    data.mapboxInit.on('click', 'places', (event) => {
      const marker = event.features[0];
      data.mapboxInit.flyTo({ center: marker.geometry.coordinates });
      const message = `<p class="mat-raised-button" style="text-align: center; width: 100%">Tous les vélos sont loués ici.</button>`;
      const coordinates = marker.geometry.coordinates.slice();
      const description =
        marker.properties.available_bikes === '0' ? marker.properties.description + message : marker.properties.description;
      new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(data.mapboxInit);
      this.store.dispatch(new MarkerClick({ geoJson: marker.properties }));
    });
  }
}
