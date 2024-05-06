import { ParkingLots } from './parking-lots';
import { Reservation } from './reservation';

export interface ParkingSpot {
  idParkingSpot?: number;
  numSpot: number;
  spotType: SpotType;
  parkingLot: ParkingLots;
  reservations?: Reservation[];
}

export enum SpotType {
  CAR = 'CAR',
  HANDICAPPED = 'HANDICAPPED',
  MOTORCYCLES = 'MOTORCYCLES',
  BICYCLE = 'BICYCLE',
  SCOOTER = 'SCOOTER'
}
