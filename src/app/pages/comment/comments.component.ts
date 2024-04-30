import { Component, OnInit } from '@angular/core';
import { Comments } from 'src/app/Model/comments';
import { CommentsService } from 'src/app/Service/comments.service'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: any[];

  constructor(
    private commentsService: CommentsService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadComments();
  //  console.log(this.comments);
  }

  loadComments() {
    this.commentsService.findAll().subscribe(data => {
      this.comments = data;
    })
  }

  deleteComment(id: number) {
    this.commentsService.deleteComment(id).subscribe(
      (response) => {
        console.log('Comment deleted successfully:', response);
        this.loadComments();
        this.toastr.success('Comment deleted successfully', 'Success');
      },
      (error) => {
        console.error('Error deleting comment:', error);
        this.toastr.error('Failed to delete comment', 'Error');
      }
    );
  }

  updateComment(comment: Comments) {
    this.commentsService.update(comment).subscribe(
      () => {
        console.log('Comment updated successfully');
        this.loadComments();
      },
      (error) => {
        console.error('Error updating comment:', error);
        // Handle update error if needed
      }
    );
  }

  addComment(comment: Comments) {
    this.commentsService.save(comment).subscribe(
      () => {
        console.log('Comment added successfully');
        this.loadComments();
      },
      (error) => {
        console.error('Error adding comment:', error);
        this.toastr.error('Failed to add comment', 'Error');
      }
    );
  }
}
