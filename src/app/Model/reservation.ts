// reservation.model.ts
import { User } from './user'; // Import the User model if it exists
import { ParkingSpot } from './parking-spot'; // 

export interface Reservation {
  idReservation?: number;
  numRes: number;
  date: Date;
  duration: Date;
  user?: User; // If the User model exists, use it here
  parkingSpot?: ParkingSpot;
}
