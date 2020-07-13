import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from '../home/home.component';
import { UserComponent } from '../user/user.component';
import { AddUserComponent } from '../add-user/add-user.component';

export const routes: Routes = [
    {path: 'login' , component: LoginComponent},
    {path: 'register' , component: RegisterComponent},
    {path: 'addUser' , component: AddUserComponent},
    {path: 'addUser/:id' , component: AddUserComponent},
    {path: 'home' , component: HomeComponent},
    {path: 'user', component: UserComponent},
    {path: '' , redirectTo: 'home', pathMatch: 'full'},
];
