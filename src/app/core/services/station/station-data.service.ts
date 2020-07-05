import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Station } from '../../models/station.model';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class StationDataService extends DefaultDataService<Station> {
  constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Station', httpClient, httpUrlGenerator);
  }
  getAll(): Observable<Station[]> {
    return this.http.get('https://download.data.grandlyon.com/ws/rdata/jcd_jcdecaux.jcdvelov/all.json?maxfeatures=450&start=1').pipe(
      // tslint:disable-next-line:no-string-literal
      map((datas) => datas['values']),
      shareReplay(),
    );
  }
}
