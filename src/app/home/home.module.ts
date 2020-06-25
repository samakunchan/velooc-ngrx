import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from '../app-routes';
import { CarousselService } from '../core/services/caroussel.service';
import { CarousselDataService } from '../core/services/caroussel-data.service';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { CarousselResolver } from '../core/services/caroussel.resolver';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(homeRoutes)],
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
