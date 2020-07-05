import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { CarousselResolver } from './core/services/caroussel/caroussel.resolver';
import { StationResolver } from './core/services/station/station.resolver';

export const homeRoutes: Routes = [{ path: '', component: HomeComponent, resolve: { caroussel: CarousselResolver } }];

export const aboutRoutes: Routes = [{ path: '', component: AboutComponent }];

export const mapRoutes: Routes = [{ path: '', component: MapComponent, resolve: { bike: StationResolver } }];

export const globalRoutes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
  { path: 'map', loadChildren: () => import('./map/map.module').then((m) => m.MapModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
