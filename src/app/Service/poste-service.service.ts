import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Poste } from '../Model/poste';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PosteServiceService {
  private posteUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrService) {
    // Update the URL to match your backend URL
    // this.userUrl = 'http://localhost:9000/parking/userdashboard/user-count';
    this.posteUrl = 'http://localhost:9090/api/v1/poste';
  }

  public findAll(): Observable<Poste[]> {
    return this.http.get<Poste[]>(this.posteUrl + '/getall');
  }

  public save(poste: Poste) {
    return this.http.post<Poste>(this.posteUrl + '/addPoste', poste).pipe(
      tap(() => {
        this.toastr.success('Post added successfully', 'Success');
      })
    );
  }

  public deletePoste(id: number): Observable<any> {
    return this.http.delete<any>(`${this.posteUrl}/deleteId/${id}`);
  }

  public update(poste: Poste): Observable<Poste> {
    return this.http.put<Poste>(`${this.posteUrl}/updatePoste/${poste.idPoste}`, poste);
  }
}