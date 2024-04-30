import { Observable, tap } from 'rxjs';
import { Comments } from '../Model/comments';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentUrl: string;

  constructor(private http: HttpClient, private toastr: ToastrService) { 
    this.commentUrl = 'http://localhost:9090/api/v1/comments';
  }

  public findAll(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.commentUrl + '/getall');
  }

  public save(comment: Comments) {
    return this.http.post<Comments>(this.commentUrl + '/addComments', comment).pipe(
      tap(() => {
        this.toastr.success('Comment added successfully', 'Success');
      })
    );
  }

  public deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.commentUrl}/deleteId/${id}`);
  }

  public update(comment: Comments): Observable<Comments> {
    return this.http.put<Comments>(`${this.commentUrl}/updateComment/${comment.idComm}`, comment);
  }
}
