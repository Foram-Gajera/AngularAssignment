import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgForm } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  url = 'https://localhost:44308/api/AdminUser/Login';

  constructor(private http: HttpClient) { }

  enroll(formData: NgForm){
    return this.http.post<any>(this.url, formData)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
