import { Reservation } from "./reservation";

export class User {

id?: number;
firstname: string;
lastname: string;
dateOfBirth?: Date;
reservations?: Reservation[]; 
}