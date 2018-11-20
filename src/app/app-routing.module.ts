import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PostScreenComponent } from './components/post-screen/post-screen.component';

const routes: Routes = [
{
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{
    path: 'home',
    component: HomeComponent
},
{
    path: 'login',
    component: LoginComponent
},
{
    path: 'register',
    component: RegisterComponent
},
{
    path: 'post/:id',
    component: PostScreenComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
