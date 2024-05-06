import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingLots } from 'src/app/Model/parking-lots';
import { ParkingLotsService } from 'src/app/Service/parking-lots.service';
import { capacityGreaterThanZero } from './validators';

@Component({
  selector: 'app-parking-lot-add',
  templateUrl: './parking-lot-add.component.html',
  styleUrls: ['./parking-lot-add.component.scss']
})
export class ParkingLotAddComponent implements OnInit {
  addParkingLotForm: FormGroup;
  isUpdateMode: boolean = false;
  parkingLotId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private parkingLotsService: ParkingLotsService
  ) {}

  ngOnInit(): void {
    this.setupForm();

    // Check if route contains parking lot id for update mode
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.isUpdateMode = true;
        this.parkingLotId = +params['id'];
        this.loadParkingLotDetails();
      }
    });
  }

  setupForm(): void {
    this.addParkingLotForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      capacity: ['', [Validators.required, capacityGreaterThanZero()]]
    });
  }

  loadParkingLotDetails(): void {
    this.parkingLotsService.getParkingLotById(this.parkingLotId).subscribe(
      (parkingLot: ParkingLots) => {
        this.addParkingLotForm.patchValue({
          name: parkingLot.name,
          capacity: parkingLot.capacity
        });
      },
      (error) => {
        console.error('Error loading parking lot details:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.addParkingLotForm.valid) {
      const parkingLotData: Partial<ParkingLots> = {
        name: this.addParkingLotForm.get('name').value,
        capacity: this.addParkingLotForm.get('capacity').value
      };

      if (this.isUpdateMode) {
        parkingLotData.idLot = this.parkingLotId;
        this.parkingLotsService.updateParkingLot(parkingLotData as ParkingLots).subscribe(
          () => {
            console.log('Parking lot updated successfully');
            this.router.navigate(['/parking-lots']);
          },
          (error) => {
            console.error('Error updating parking lot:', error);
          }
        );
      } else {
        this.parkingLotsService.saveParkingLot(parkingLotData as ParkingLots).subscribe(
          () => {
            console.log('New parking lot added successfully');
            this.router.navigate(['/parking-lots']);
          },
          (error) => {
            console.error('Error adding parking lot:', error);
          }
        );
      }
    }
  }

  goToParkingLots(): void {
    this.router.navigate(['/parking-lots']);
  }
}
