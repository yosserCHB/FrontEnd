import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ParkingLotsComponent } from './pages/parking-lots/parking-lots.component';
import { ParkingLotAddComponent } from './parking-lot-add/parking-lot-add.component';
import { ParkingSpotsComponent } from './pages/parking-spots/parking-spots.component'; // Import ParkingSpotsComponent
import { ParkingSpotAddComponent } from './parking-spot-add/parking-spot-add.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ReservationAddComponent } from './reservation-add/reservation-add.component';

const routes: Routes = [
  {
    path: 'parking/poste/addPoste',
    component: UserProfileComponent
  },
  {
    path: 'parking-lots',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: ParkingLotsComponent
      },
      {
        path: 'add',
        component: ParkingLotAddComponent
      },
      {
        path: 'update/:id',
        component: ParkingLotAddComponent
      }
    ]
  },
  // Route for Parking Spots
  {
    path: 'parking-spots',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: ParkingSpotsComponent
      },
      {
        path: 'add',
        component: ParkingSpotAddComponent
      },
    ]
  },
  {
    path: 'reservations',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: ReservationComponent
      },
      {
        path: 'add',
        component: ReservationAddComponent // Route for the reservation-add component
      }
      // Add other child routes if needed
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [],
})
export class AppRoutingModule { }
