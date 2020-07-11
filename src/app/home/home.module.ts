import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from '../app-routes';
import { CarousselService } from '../core/services/caroussel/caroussel.service';
import { CarousselDataService } from '../core/services/caroussel/caroussel-data.service';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { CarousselResolver } from '../core/services/caroussel/caroussel.resolver';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { reservationFeatureKey, reservationReducer } from '../store/reservation/reservation.reducer';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature(reservationFeatureKey, reservationReducer),
    MatDialogModule,
  ],
  providers: [CarousselService, CarousselResolver, CarousselDataService],
})
export class HomeModule {
  constructor(
    private eds: EntityDefinitionService,
    private carousselDataService: CarousselDataService,
    private entityDataService: EntityDataService,
  ) {
    this.eds.registerMetadataMap({ Caroussel: {} });
    this.entityDataService.registerService('Caroussel', carousselDataService);
  }
}
