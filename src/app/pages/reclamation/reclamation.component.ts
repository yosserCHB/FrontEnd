import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reclamation, ReclamationType } from 'src/app/Model/reclamation';
import { ReclamationService } from 'src/app/Service/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {
  rectypes: ReclamationType[] = [ReclamationType.NEW, ReclamationType.IN_PROGRESS, ReclamationType.RESOLVED, ReclamationType.CLOSED];
  Add: FormGroup;
  reclamation: Reclamation = new Reclamation();
  submitted = false ; 
  constructor(private ReclamationService: ReclamationService) { }

  ngOnInit() {
    // Initialize current date
    const currentDate = new Date().toISOString().substring(0, 10);

    // Initialize form with default values
    this.Add = new FormGroup({
      title: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]), 
      userName: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
      debugger
      this.submitted = true;
    if (this.Add.valid) {
      this.reclamation.title = this.Add.get('title').value;
      this.reclamation.status = this.Add.get('status').value;
      this.reclamation.content = this.Add.get('content').value;
      this.reclamation.userName = this.Add.get('userName').value;

      this.ReclamationService.save(this.reclamation).subscribe(
        (response) => {
          console.log('New subscription added:', response);
          this.Add.reset();
        },
        (error) => {
          console.error('Error adding subscription:', error);
        }
      );
    } else {
      this.markFormGroupTouched(this.Add);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}
