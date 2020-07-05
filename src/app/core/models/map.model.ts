import { Lyon } from '../datas/map-data';

export interface Map {
  container: string;
  style: string;
  center: number[];
  zoom: number;
  attributionControl: boolean;
}

export const mapInitInfos: Map = {
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9',
  center: Lyon,
  zoom: 11,
  attributionControl: false,
};
