import { Injectable } from '@angular/core';
import { Reservation } from '../../models/reservation.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor() {}

  build(datas: any): Observable<Reservation> {
    const reservation = {
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
}
