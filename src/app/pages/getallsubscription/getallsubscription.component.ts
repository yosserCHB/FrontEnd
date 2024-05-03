import { Component, OnInit } from '@angular/core';
import { UserSubscriptionService } from 'src/app/Service/subscribe.service';
import { Subscription } from 'src/app/Model/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-getallsubscription',
  templateUrl: './getallsubscription.component.html',
  styleUrls: ['./getallsubscription.component.scss']
})
export class GetallsubscriptionComponent implements OnInit {

  subscriptions: Subscription[] ;
 

  constructor(private userSubscriptionService: UserSubscriptionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadSubscription();
  }

  loadSubscription() {
    this.userSubscriptionService.findAll().subscribe(data => {
      this.subscriptions = data;
    });
  }
  deleteSubscription(id: number) {
    this.userSubscriptionService.deleteSubscription(id).subscribe(
      (response) => {
        console.log('Post deleted successfully:', response);
        this.loadSubscription();
        this.toastr.success('Post deleted successfully', 'Success');
      },
      (error) => {
        console.error('Error deleting poste:', error);
        this.toastr.error('Failed to delete post', 'Error');
      }
    );
  }
 
  
}
