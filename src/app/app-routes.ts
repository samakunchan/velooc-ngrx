import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { CarousselResolver } from './core/services/caroussel/caroussel.resolver';
import { StationResolver } from './core/services/station/station.resolver';
import { ReservationResolver } from './core/services/reservation/reservation.resolver';

export const homeRoutes: Routes = [
  { path: '', component: HomeComponent, resolve: { caroussel: CarousselResolver, reservation: ReservationResolver } },
];

export const aboutRoutes: Routes = [{ path: '', component: AboutComponent }];

export const mapRoutes: Routes = [
  { path: '', component: MapComponent, resolve: { station: StationResolver, reservation: ReservationResolver } },
];

export const globalRoutes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule), data: { animation: 'Home' } },
  { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule), data: { animation: 'About' } },
  { path: 'map', loadChildren: () => import('./map/map.module').then((m) => m.MapModule), data: { animation: 'Map' } },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
