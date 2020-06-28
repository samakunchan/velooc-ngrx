import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { filter, first, tap } from 'rxjs/operators';
import { BikeService } from './bike.service';

@Injectable()
export class BikeResolver implements Resolve<boolean> {
  constructor(private bikeService: BikeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.bikeService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.bikeService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first(),
    );
  }
}
