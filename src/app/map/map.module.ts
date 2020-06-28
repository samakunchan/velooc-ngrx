import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { mapRoutes } from '../app-routes';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { BikeDataService } from '../core/services/bike/bike-data.service';
import { BikeService } from '../core/services/bike/bike.service';
import { Bike } from '../core/models/bike.model';
import { BikeResolver } from '../core/services/bike/bike.resolver';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { MapHolderService } from '../core/services/map/mapHolder.service';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from '../store/map.effects';
import { StoreModule } from '@ngrx/store';
import { mapFeatureKey, mapReducer } from '../store/map.reducer';
import { MapFacadeService } from '../core/services/map/mapFacade.service';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(mapRoutes),
    StoreModule.forFeature(mapFeatureKey, mapReducer),
    EffectsModule.forFeature([MapEffects]),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1Ijoic2FtYWt1bmNoYW4iLCJhIjoiY2tiemgwbzNuMTlveDM0bXhlb2Q0b3V6NSJ9.27VSI428AiXKKOFgZuKMvA',
    }),
  ],
  providers: [BikeService, BikeDataService, BikeResolver, MapHolderService, MapFacadeService],
})
export class MapModule {
  constructor(
    private eds: EntityDefinitionService,
    private bikeDataService: BikeDataService,
    private entityDataService: EntityDataService,
  ) {
    this.eds.registerMetadataMap({
      Bike: {
        selectId: (bike: Bike) => bike.number,
      },
    });
    this.entityDataService.registerService('Bike', bikeDataService);
  }
}
