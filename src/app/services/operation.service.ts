import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from '../shared/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OperationService {

  newuser: NewUser;
  rootUrl = 'https://localhost:44308/api';

  constructor(private http: HttpClient) { }

  getUser(): Observable<any>{
    return this.http.get(this.rootUrl + '/users');
  }

  getUserById(id): Observable<any>{
    return this.http.get(this.rootUrl + '/users/' + id);
  }

  postUser(user){
    // alert(user)
    return this.http.post(this.rootUrl + '/users', user );
  }

  putUser(id, user){
    return this.http.put(this.rootUrl + '/users/' + id , user );
  }

  deleteUser(id){
    return this.http.delete(this.rootUrl + '/users/' + id);
  }
}
