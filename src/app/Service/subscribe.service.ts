import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../Model/Subscription';

@Injectable({
  providedIn: 'root'
})
export class UserSubscriptionService {
  private subscribtionUrl: string;
  //private percentageUsersUrl: string;

  constructor(private http: HttpClient) {
    // Update the URL to match your backend URL
   // this.userUrl = 'http://localhost:9000/parking/userdashboard/user-count';
    this.subscribtionUrl = 'http://localhost:9000/api/v1/subscription'; 
  }

  public findAll(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.subscribtionUrl+'/getAll');
  }

  public save(Subscription: Subscription) {
    return this.http.post<Subscription>(this.subscribtionUrl+'/add', Subscription);
  }
  public deleteSubscription(id: number): Observable<any> {
    return this.http.delete<any>(`${this.subscribtionUrl}/delete/${id}`);
  }
  
}