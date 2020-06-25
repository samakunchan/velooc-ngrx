import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Caroussel } from '../models/caroussel.model';

@Injectable()
export class CarousselService extends EntityCollectionServiceBase<Caroussel> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Caroussel', serviceElementsFactory);
  }
}
