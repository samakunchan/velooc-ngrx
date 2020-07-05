export interface Station {
  number: number;
  name: string;
  available_bikes: number;
  bikes_stand: number;
  available_bikes_stand: number;
  availability: string;
  last_update: string;
  status: string;
  commune: string;
  address: string;
  address2: string;
  lat: string;
  lng: string;
}

export interface GeoJson {
  geometry: {
    type: string;
    coordinates: string[];
  };
  properties: {
    number: number;
    name: string;
    available_bikes: number;
    bikes_stand: number;
    available_bikes_stand: number;
    availability: string;
    last_update: string;
    status: string;
    commune: string;
    address: string;
    address2: string;
  };
  type: string;
}
