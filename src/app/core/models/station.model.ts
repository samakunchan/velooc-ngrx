export interface Station {
  number: number;
  name: string;
  commune: string;
  address: string;
  address2: string;
  available_bikes?: number;
  bikes_stand?: number;
  available_bikes_stand?: number;
  availability?: string;
  last_update?: string;
  status?: string;
  lat?: string;
  lng?: string;
}
