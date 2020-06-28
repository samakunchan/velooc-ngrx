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

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, RouterModule.forChild(mapRoutes)],
  providers: [BikeService, BikeDataService, BikeResolver],
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
