import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Poste } from 'src/app/Model/poste';
import { PosteServiceService } from 'src/app/Service/poste-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  Add: FormGroup;
  poste: Poste = new Poste();

  constructor(private posteServiceService: PosteServiceService) { }

  ngOnInit() {
    // Initialize current date
    const currentDate = new Date().toISOString().substring(0, 10);

    // Initialize form with default values
    this.Add = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(currentDate, [Validators.required]), // Use currentDate here
      userName: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.Add.valid) {
      this.poste.title = this.Add.get('title').value;
      this.poste.description = this.Add.get('description').value;
      this.poste.date = this.Add.get('date').value;
      this.poste.userName = this.Add.get('userName').value;

      this.posteServiceService.save(this.poste).subscribe(
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
