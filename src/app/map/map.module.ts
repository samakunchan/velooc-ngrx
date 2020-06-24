import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { mapRoutes } from '../app-routes';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, RouterModule.forChild(mapRoutes)],
})
export class MapModule {}
