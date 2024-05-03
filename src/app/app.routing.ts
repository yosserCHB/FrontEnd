import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
//import { SubscribeComponent } from './pages/subscribe/subscribe.component'; // Importez SubscribeComponent ici
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { GetallsubscriptionComponent } from './pages/getallsubscription/getallsubscription.component';
import { SubscribeComponent } from './pages/subscribe/subscribe.component';
//import { SubscribeComponent } from './pages/subscribe/subscribe.component';

const routes: Routes = [
  { path: '/parking/poste/addPoste', component: UserProfileComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: AdminLayoutComponent, children: [{ path: '', loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) }] },
  { path: '', component: AuthLayoutComponent, children: [{ path: '', loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule) }] },
  { path: 'getallsubscription', component: GetallsubscriptionComponent },
  { path: 'subscribe', component: SubscribeComponent },
  { path: '**', redirectTo: 'dashboard' },
 // { path: 'subscribe', component: SubscribeComponent },
 // { path: 'subscribe', component: SubscribeComponent },*
 
  

];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }