import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  generateReservationPdf(reservationData: any): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      const pdf = new jsPDF();
      pdf.text('Reservation Details', 10, 10);
      // Add reservation details to the PDF
      pdf.text(`Reservation Number: ${reservationData.numRes}`, 10, 20);
      pdf.text(`Date: ${reservationData.date}`, 10, 30);
      pdf.text(`Duration: ${reservationData.duration}`, 10, 40);
      pdf.text(`User ID: ${reservationData.user.id}`, 10, 50);
      pdf.text(`Parking Spot ID: ${reservationData.parkingSpot.idParkingSpot}`, 10, 60);
      // Save the PDF
      pdf.save('reservation.pdf');
      // Notify observers that PDF generation is complete
      observer.next();
      observer.complete();
    });
  }
}
