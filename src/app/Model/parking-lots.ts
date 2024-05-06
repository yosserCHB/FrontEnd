import { ParkingSpot } from './parking-spot';

export class ParkingLots {
    idLot?: number;
    name: string;
    capacity: number;
    parkingSpots?: ParkingSpot[];
}
