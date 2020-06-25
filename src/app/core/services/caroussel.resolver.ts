import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CarousselService } from './caroussel.service';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class CarousselResolver implements Resolve<boolean> {
  constructor(private carousselService: CarousselService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.carousselService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.carousselService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first(),
    );
  }
}
