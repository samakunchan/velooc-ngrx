import { Component, OnInit } from '@angular/core';
import { CarousselService } from '../core/services/caroussel/caroussel.service';
import { Observable } from 'rxjs';
import { fadeInAnimation, fadeOutAnimation, jelloAnimation } from 'angular-animations';
import { Caroussel } from '../core/models/caroussel.model';
import { map } from 'rxjs/operators';
import { getReservation } from '../store/reservation/reservation.selectors';
import { Store } from '@ngrx/store';
import { StoreState } from '../store/store';
import { Station } from '../core/models/station.model';
import { MatDialog } from '@angular/material/dialog';
import { ReservationCompleteComponent } from '../reservation-complete/reservation-complete.component';
import { DialogBuilder } from '../core/utils/dialogBuilder';

@Component({
  selector: 'velooc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInAnimation(), fadeOutAnimation(), jelloAnimation()],
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  caroussel$: Observable<Caroussel>;
  reservation$: Observable<Station>;
  animationState = false;
  private animationWithState = false;
  animation = 'fadeIn';

  constructor(private carousselService: CarousselService, private store: Store<StoreState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.reservation$ = this.store.select(getReservation);
    this.loading$ = this.carousselService.loading$;
    this.loaded$ = this.carousselService.loaded$;
    this.caroussel$ = this.carousselService.getAll().pipe(map((caroussel) => caroussel[0]));
  }

  onLeft(index: number) {
    this.keepAnimation();
    this.caroussel$ = this.carousselService.getAll().pipe(
      map((caroussel) => {
        if (index <= 0) {
          index = caroussel.length;
        }
        return caroussel[index - 1];
      }),
    );
  }

  onRight(index: number) {
    this.keepAnimation();
    this.caroussel$ = this.carousselService.getAll().pipe(
      map((caroussel) => {
        if (index >= caroussel.length - 1) {
          index = -1;
        }
        return caroussel[index + 1];
      }),
    );
  }
  // Cette méthode permet de reset l'animation, ce qui permet de toujours voir l'animation
  keepAnimation() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
  }

  showCompleteReservation(reservation) {
    const dialogConfig = new DialogBuilder().withTitle('Réservation').withWidth('550px').withDatas(reservation).build();
    this.dialog.open(ReservationCompleteComponent, dialogConfig).afterClosed();
  }
}
