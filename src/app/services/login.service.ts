import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'https://localhost:44308/api';



  constructor(private http: HttpClient) {  }

  login(formData: NgForm){
    return this.http.post<any>(this.baseUrl + '/AdminUser/Login', formData)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }

  getUserProfile(){
    // var tokenHeader = new HttpHeaders( { 'Authorization': 'Bearer ' + localStorage.getItem('token')});
    // return this.http.get(this.baseUrl + '/UserProfile', {headers: tokenHeader});

    return this.http.get(this.baseUrl + '/UserProfile');
    // add token through intercepter

  }


}
