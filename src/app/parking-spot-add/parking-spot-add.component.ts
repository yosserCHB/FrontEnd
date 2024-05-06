import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ParkingSpotsService } from 'src/app/Service/parking-spots.service';
import { SpotType } from 'src/app/Model/parking-spot';
import { ParkingLots } from '../Model/parking-lots';
import { ParkingLotsService } from '../Service/parking-lots.service';

@Component({
  selector: 'app-parking-spot-add',
  templateUrl: './parking-spot-add.component.html',
  styleUrls: ['./parking-spot-add.component.scss']
})
export class ParkingSpotAddComponent implements OnInit {

  addParkingSpotForm: FormGroup;
  spotTypes: SpotType[] = Object.values(SpotType);
  parkingLots: ParkingLots[] = []; // Assuming you have a ParkingLot interface/model

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private parkingSpotsService: ParkingSpotsService,
    private parkingLotsService: ParkingLotsService // Inject ParkingLotsService
  ) { }

  ngOnInit(): void {
    this.setupForm();
    this.loadParkingLots(); // Load parking lots when the component initializes
  }

  setupForm(): void {
    this.addParkingSpotForm = this.formBuilder.group({
      numSpot: ['', [Validators.required, Validators.min(1)]],
      spotType: ['', Validators.required],
      parkingLotId: ['', Validators.required] // Add the new form control for parking lot ID
    });
  }

  loadParkingLots(): void {
    this.parkingLotsService.getAllParkingLots().subscribe(
      (parkingLots: ParkingLots[]) => {
        this.parkingLots = parkingLots;
      },
      (error) => {
        console.error('Error loading parking lots:', error);
      }
    );
  }

  onSubmit(): void {
  if (this.addParkingSpotForm.valid) {
    const parkingSpotData = {
      numSpot: this.addParkingSpotForm.get('numSpot').value,
      spotType: this.addParkingSpotForm.get('spotType').value,
      parkingLot: {  // Include all properties of the ParkingLots object
        idLot: this.addParkingSpotForm.get('parkingLotId').value,
        name: null, // Set to null as it's not provided in the form
        capacity: 0   // Set to 0 as it's not provided in the form
      }
    };
    this.parkingSpotsService.saveParkingSpot(parkingSpotData).subscribe(
      () => {
        this.toastr.success('Parking spot added successfully', 'Success');
        this.router.navigate(['/parking-spots']);
      },
      (error) => {
        console.error('Error adding parking spot:', error);
        this.toastr.error('Failed to add parking spot', 'Error');
      }
    );
  }
}

  
  
  

  goToParkingSpots(): void {
    this.router.navigate(['/parking-spots']);
  }
}