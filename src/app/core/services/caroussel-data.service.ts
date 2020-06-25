import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Caroussel } from '../models/caroussel.model';
import { Observable, of } from 'rxjs';
import { carousselData } from '../datas/caroussel-data';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CarousselDataService extends DefaultDataService<Caroussel> {
  constructor(httpClient: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Caroussel', httpClient, httpUrlGenerator);
  }
  getAll(): Observable<Caroussel[]> {
    return of(carousselData);
  }
}
