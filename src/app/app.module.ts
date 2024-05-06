import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ParkingLotsComponent } from './pages/parking-lots/parking-lots.component';
import { ParkingLotAddComponent } from './parking-lot-add/parking-lot-add.component';
import { ParkingSpotsComponent } from './pages/parking-spots/parking-spots.component';
import { ParkingSpotAddComponent } from './parking-spot-add/parking-spot-add.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ParkingLotsComponent,
    ParkingLotAddComponent,
    ParkingSpotsComponent,
    ParkingSpotAddComponent,
    ReservationComponent,
    ReservationAddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
