import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Bike } from '../../models/bike.model';

@Injectable()
export class BikeService extends EntityCollectionServiceBase<Bike> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Bike', serviceElementsFactory);
  }
}
