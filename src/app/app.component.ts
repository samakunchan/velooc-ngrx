import { Component } from '@angular/core';
import { slideInAnimation } from './route-animation';

@Component({
  selector: 'velooc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  // TODO tester AppState partout
  constructor() {}
}
