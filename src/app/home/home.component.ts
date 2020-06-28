import { Component, OnInit } from '@angular/core';
import { CarousselService } from '../core/services/caroussel/caroussel.service';
import { Observable } from 'rxjs';
import { fadeInAnimation, fadeOutAnimation, jelloAnimation } from 'angular-animations';
import { Caroussel } from '../core/models/caroussel.model';
import { map } from 'rxjs/operators';

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
  animationState = false;
  private animationWithState = false;
  animation = 'fadeIn';

  constructor(private carousselService: CarousselService) {}

  ngOnInit(): void {
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

  keepAnimation() {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
      this.animationWithState = !this.animationWithState;
    }, 1);
  }
}
