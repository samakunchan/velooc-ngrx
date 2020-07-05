import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Station } from '../../models/station.model';

@Injectable()
export class StationService extends EntityCollectionServiceBase<Station> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Station', serviceElementsFactory);
  }
}
