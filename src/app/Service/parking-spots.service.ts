// parking-spots.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingSpot } from '../Model/parking-spot'; // Update the path according to your structure

@Injectable({
  providedIn: 'root'
})
export class ParkingSpotsService {

  private apiUrl = 'http://localhost:9000/api/v1/api/parking-spots'; // Adjust as necessary

  constructor(private http: HttpClient) { }

  getAllParkingSpots(): Observable<ParkingSpot[]> {
    return this.http.get<ParkingSpot[]>(`${this.apiUrl}`);
  }

  getParkingSpotById(id: number): Observable<ParkingSpot> {
    return this.http.get<ParkingSpot>(`${this.apiUrl}/${id}`);
  }

  saveParkingSpot(parkingSpot: ParkingSpot): Observable<ParkingSpot> {
    return this.http.post<ParkingSpot>(this.apiUrl, parkingSpot);
  }

  updateParkingSpot(parkingSpot: ParkingSpot): Observable<ParkingSpot> {
    return this.http.put<ParkingSpot>(`${this.apiUrl}/${parkingSpot.idParkingSpot}`, parkingSpot);
  }

  deleteParkingSpot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // New method to fetch available parking spots
  getAvailableParkingSpots(startDate: string, endDate: string, spotType: string): Observable<ParkingSpot[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('spotType', spotType);

    return this.http.get<ParkingSpot[]>(`${this.apiUrl}/available`, { params });
  }
}
