import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CommentsComponent } from './pages/comment/comments.component';
import { AddCommentComponent } from './pages/add-comment/add-comment.component';
import { UpdatePosteComponent } from './pages/update-poste/update-poste.component';
import { UpdateCommentComponent } from './pages/update-comment/update-comment.component';

const routes: Routes = [
  {
    path: 'parking/poste/addPoste',
    component: UserProfileComponent
  },
  {
    path: 'parking/comment/addComment',
    component: AddCommentComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      },
      {
        path: 'comments',
        component: CommentsComponent
      },
      {
        path: 'add-comment',
        component: AddCommentComponent
      },
      {
        path: 'update-poste/:id', 
        component: UpdatePosteComponent
      },
      {
        path: 'update-comment/:id',
        component: UpdateCommentComponent
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
