import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ThreadsComponent } from './threads/threads.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';

import { AuthGuardService as AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', component: ThreadsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'thread/:descriptor',
    component: ThreadDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
