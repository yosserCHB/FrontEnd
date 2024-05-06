// parking-lots.component.ts

import { Component, OnInit } from '@angular/core';
import { ParkingLots } from 'src/app/Model/parking-lots';
import { ParkingLotsService } from 'src/app/Service/parking-lots.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parking-lots',
  templateUrl: './parking-lots.component.html',
  styleUrls: ['./parking-lots.component.scss']
})
export class ParkingLotsComponent implements OnInit {

  parkingLots: ParkingLots[];

  constructor(
    private parkingLotsService: ParkingLotsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadParkingLots();
  }

  loadParkingLots() {
    this.parkingLotsService.getAllParkingLots().subscribe(data => {
      this.parkingLots = data;
    });
  }

  deleteParkingLot(id: number) {
    this.parkingLotsService.deleteParkingLot(id).subscribe(
      () => {
        console.log('Parking lot deleted successfully');
        this.loadParkingLots();
        this.toastr.success('Parking lot deleted successfully', 'Success');
      },
      (error) => {
        console.error('Error deleting parking lot:', error);
        this.toastr.error('Failed to delete parking lot', 'Error');
      }
    );
  }

  updateParkingLot(idLot: number) {
    this.router.navigate(['/parking-lots/update', idLot]); // Navigate to update route with idLot parameter
  }
}
