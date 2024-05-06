import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/Service/reservation.service';
import { ParkingSpotsService } from 'src/app/Service/parking-spots.service';
import { PdfGeneratorService } from 'src/app/Service/pdf-generator.service';
import { ParkingSpot } from 'src/app/Model/parking-spot'; // Assuming the model is defined in this path
import { Reservation } from 'src/app/Model/reservation'; // Assuming the model is defined in this path

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.scss']
})
export class ReservationAddComponent implements OnInit {

  addReservationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private reservationService: ReservationService,
    private parkingSpotService: ParkingSpotsService,
    private pdfGeneratorService: PdfGeneratorService
  ) { }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.addReservationForm = this.formBuilder.group({
      numRes: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', Validators.required],
      userId: ['', Validators.required],
      parkingSpotId: [{ value: '', disabled: true }, Validators.required],
      spotType: ['', Validators.required]
    });
  }

  onClickGetAvailableSpot(): void {
    if (this.addReservationForm.get('date').value && this.addReservationForm.get('duration').value) {
      const startDate = new Date(this.addReservationForm.get('date').value).toISOString();
      const endDate = new Date(this.addReservationForm.get('duration').value).toISOString();
      const spotType = this.addReservationForm.get('spotType').value;
  
      this.parkingSpotService.getAvailableParkingSpots(startDate, endDate, spotType)
        .subscribe((spots: ParkingSpot[]) => {
          if (spots.length > 0) {
            const availableSpotId = spots[0].idParkingSpot;
            this.addReservationForm.patchValue({ parkingSpotId: availableSpotId });
          } else {
            this.toastr.error('No available parking spots for the selected time range.');
          }
        });
    } else {
      this.toastr.error('Please select Date and Duration first.');
    }
  }

  onSubmit(): void {
    if (this.addReservationForm.valid) {
      const reservationData = {
        numRes: this.addReservationForm.get('numRes').value,
        date: this.addReservationForm.get('date').value,
        duration: this.addReservationForm.get('duration').value,
        user: { 
          id: this.addReservationForm.get('userId').value,
          firstname: null,
          lastname: null,
          dateOfBirth: null,
          reservations: null
        },
        parkingSpot: { 
          idParkingSpot: this.addReservationForm.get('parkingSpotId').value,
          numSpot: null,
          spotType: null,
          parkingLot: null,
          reservations: null
        }
      };
  
      // Generate the PDF first
      this.pdfGeneratorService.generateReservationPdf(reservationData)
        .subscribe(() => {
          console.log('PDF generated successfully');
          this.router.navigate(['/reservations']);
          // Save the reservation after PDF is generated
          this.saveReservation(reservationData);
        });
    }
  }

  saveReservation(reservationData: any): void {
    this.reservationService.saveReservation(reservationData)
      .subscribe(() => {
        console.log('Reservation saved successfully');
        this.toastr.success('Reservation added successfully');
      });
  }

  goToReservations(): void {
    this.router.navigate(['/reservations']);
  }
}
