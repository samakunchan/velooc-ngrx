import { Component, OnInit } from '@angular/core';
import { CarousselService } from '../core/services/caroussel.service';
import { Observable } from 'rxjs';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'velooc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation()],
})
export class HomeComponent implements OnInit {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  constructor(private carousselService: CarousselService) {
    this.loading$ = this.carousselService.loading$;
    this.loaded$ = this.carousselService.loaded$;
    this.carousselService.getAll();
  }

  ngOnInit(): void {}
}
