import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HomeComponent } from '../home/home.component';
import { UserComponent } from '../user/user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { AuthGuard } from '../auth/auth.guard';

export const routes: Routes = [
    {path: 'login' , component: LoginComponent},
    {path: 'register' , component: RegisterComponent},
    {path: 'addUser' , component: AddUserComponent, canActivate: [AuthGuard]},
    {path: 'addUser/:id' , component: AddUserComponent, canActivate: [AuthGuard]},
    {path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    {path: '' , redirectTo: 'login', pathMatch: 'full'},
];
