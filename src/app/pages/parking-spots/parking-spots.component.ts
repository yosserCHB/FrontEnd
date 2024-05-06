// parking-spots.component.ts
import { Component, OnInit } from '@angular/core';
import { ParkingSpot, SpotType } from 'src/app/Model/parking-spot';
import { ParkingLots } from 'src/app/Model/parking-lots';
import { ParkingSpotsService } from 'src/app/Service/parking-spots.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-spots',
  templateUrl: './parking-spots.component.html',
  styleUrls: ['./parking-spots.component.scss']
})
export class ParkingSpotsComponent implements OnInit {

  parkingSpots: ParkingSpot[];

  constructor(
    private parkingSpotsService: ParkingSpotsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadParkingSpots();
  }

  loadParkingSpots() {
    this.parkingSpotsService.getAllParkingSpots().subscribe(data => {
      // Ensure that parkingLot property is properly populated
      this.parkingSpots = data.map(parkingSpot => {
        const parkingLot: ParkingLots = parkingSpot.parkingLot;
        parkingSpot.parkingLot = parkingLot.idLot ? parkingLot : { idLot: null, name: null, capacity: 0 };
        return parkingSpot;
      });
    });
  }

  deleteParkingSpot(id: number) {
    this.parkingSpotsService.deleteParkingSpot(id).subscribe(
      () => {
        this.toastr.success('Parking spot deleted successfully', 'Success');
        this.loadParkingSpots();
      },
      error => {
        this.toastr.error('Failed to delete parking spot', 'Error');
        console.error('Error deleting parking spot:', error);
      }
    );
  }

  updateParkingSpot(idParkingSpot: number) {
    this.router.navigate(['/parking-spots/update', idParkingSpot]);
  }
}
