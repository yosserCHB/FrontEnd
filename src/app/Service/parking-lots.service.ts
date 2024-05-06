import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParkingLots } from '../Model/parking-lots';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ParkingLotsService {
  private parkingLotsUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.parkingLotsUrl = 'http://localhost:9000/api/v1/api/parking-lots';
  }

  public getAllParkingLots(): Observable<ParkingLots[]> {
    return this.http.get<ParkingLots[]>(this.parkingLotsUrl);
  }

  public getParkingLotById(id: number): Observable<ParkingLots> {
    return this.http.get<ParkingLots>(`${this.parkingLotsUrl}/${id}`);
  }

  public saveParkingLot(parkingLot: ParkingLots): Observable<ParkingLots> {
    return this.http.post<ParkingLots>(this.parkingLotsUrl, parkingLot);
  }

  public updateParkingLot(parkingLot: ParkingLots): Observable<ParkingLots> {
    return this.http.put<ParkingLots>(`${this.parkingLotsUrl}/${parkingLot.idLot}`, parkingLot);
  }

  public deleteParkingLot(id: number): Observable<void> {
    return this.http.delete<void>(`${this.parkingLotsUrl}/${id}`);
  }
}
