import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/Model/reservation';
import { User } from 'src/app/Model/user';
import { ReservationService } from 'src/app/Service/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ParkingSpot } from 'src/app/Model/parking-spot';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {

  reservations: Reservation[];

  constructor(
    private reservationService: ReservationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getAllReservations().subscribe(data => {
      // Ensure that user and parkingSpot properties are properly populated
      this.reservations = data.map(reservation => {
        const user: User = reservation.user;
        const parkingSpot: ParkingSpot = reservation.parkingSpot;
        reservation.user = user.id ? user : { id: null, firstname: null, lastname: null };
        reservation.parkingSpot = parkingSpot.idParkingSpot ? parkingSpot : { idParkingSpot: null, numSpot: null, spotType: null, parkingLot: { idLot: null, name: null, capacity: 0 } };
        return reservation;
      });
    });
  }

  deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).subscribe(
      () => {
        this.toastr.success('Reservation deleted successfully', 'Success');
        this.loadReservations();
      },
      error => {
        this.toastr.error('Failed to delete reservation', 'Error');
        console.error('Error deleting reservation:', error);
      }
    );
  }

  updateReservation(idReservation: number) {
    this.router.navigate(['/reservations/update', idReservation]);
  }
}
