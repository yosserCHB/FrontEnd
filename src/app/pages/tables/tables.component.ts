import { Component, OnInit } from '@angular/core';
import { Poste } from 'src/app/Model/poste';
import { PosteServiceService } from 'src/app/Service/poste-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  poste: Poste[];

  constructor(
    private posteServiceService: PosteServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadPostes();
   // console.log(this.poste);
  }

  loadPostes() {
    this.posteServiceService.findAll().subscribe(data => {
      this.poste = data;
    });
  }

  deletePoste(id: number) {
    this.posteServiceService.deletePoste(id).subscribe(
      (response) => {
        console.log('Post deleted successfully:', response);
        this.loadPostes();
        this.toastr.success('Post deleted successfully', 'Success');
      },
      (error) => {
        console.error('Error deleting poste:', error);
        this.toastr.error('Failed to delete post', 'Error');
      }
    );
  }

  updatePoste(poste: Poste) {
    this.posteServiceService.update(poste).subscribe(
      () => {
        console.log('Post updated successfully');
        // Reload data after update
        this.loadPostes();
      },
      (error) => {
        console.error('Error updating poste:', error);
        // Handle update error if needed
      }
    );
  }
  addPoste(poste: Poste) {
    this.posteServiceService.save(poste).subscribe(
      () => {
        console.log('Post added successfully');
        // Refresh the list of postes after addition if necessary
        this.loadPostes();
      },
      (error) => {
        console.error('Error adding poste:', error);
        // Handle add errors if necessary
        this.toastr.error('Failed to add post', 'Error');
      }
    );
  }
}
