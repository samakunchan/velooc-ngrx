import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { mapRoutes } from '../app-routes';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { StationDataService } from '../core/services/station/station-data.service';
import { StationService } from '../core/services/station/station.service';
import { Station } from '../core/models/station.model';
import { StationResolver } from '../core/services/station/station.resolver';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from '../store/map/map.effects';
import { StoreModule } from '@ngrx/store';
import { mapFeatureKey, mapReducer } from '../store/map/map.reducer';
import { MapService } from '../core/services/map/map.service';
import { MatButtonModule } from '@angular/material/button';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CanvasService } from '../core/services/canvas/canvas.service';
import { CanvasComponent } from './canvas/canvas.component';
import { MatIconModule } from '@angular/material/icon';
import { CanvasEffects } from '../store/canvas/canvas.effects';
import { canvasFeatureKey, canvasReducer } from '../store/canvas/canvas.reducer';
import { reservationFeatureKey, reservationReducer } from '../store/reservation/reservation.reducer';
import { ReservationEffects } from '../store/reservation/reservation.effects';
import { ReservationResolver } from '../core/services/reservation/reservation.resolver';

@NgModule({
  declarations: [MapComponent, ReservationDialogComponent, CanvasComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(mapRoutes),
    StoreModule.forFeature(mapFeatureKey, mapReducer),
    StoreModule.forFeature(canvasFeatureKey, canvasReducer),
    StoreModule.forFeature(reservationFeatureKey, reservationReducer),
    EffectsModule.forFeature([MapEffects, CanvasEffects, ReservationEffects]),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [StationService, StationDataService, StationResolver, MapService, CanvasService, ReservationResolver],
})
export class MapModule {
  constructor(
    private eds: EntityDefinitionService,
    private stationDataService: StationDataService,
    private entityDataService: EntityDataService,
  ) {
    this.eds.registerMetadataMap({
      Station: {
        selectId: (station: Station) => station.number,
      },
    });
    this.entityDataService.registerService('Station', stationDataService);
  }
}
