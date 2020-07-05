import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, first, tap } from 'rxjs/operators';
import { StationService } from './station.service';

@Injectable()
export class StationResolver implements Resolve<boolean> {
  constructor(private stationService: StationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.stationService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.stationService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first(),
    );
  }
}
