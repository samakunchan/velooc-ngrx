import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { of, Observable } from 'rxjs';
import { StoreState } from '../../../store/store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { checkIfActive } from '../../../store/reservation/reservation.selectors';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private store: Store<StoreState>) {}

  build(datas: any): Observable<Reservation> {
    const reservation: Reservation = {
      url: datas.url,
      nom: datas.nom,
      prenom: datas.prenom,
      station: {
        number: datas.number,
        name: datas.name,
        commune: datas.commune,
        address: datas.address,
        address2: datas.address2,
      },
    };
    sessionStorage.setItem('reservation', JSON.stringify(reservation));
    return of(reservation);
  }

  setTimer(): Observable<string> {
    const timer = sessionStorage.getItem('timer') ? sessionStorage.getItem('timer') : String(Date.now());
    sessionStorage.setItem('timer', timer);
    return of(timer);
  }
  // Faire un check timer active qui return bool
  checkReservation() {
    return this.store.select(checkIfActive).pipe(
      map((isActive) => isActive === 'yes' ? 'yes' : 'no'),
    );
  }
}
