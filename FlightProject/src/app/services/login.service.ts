import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { UserToken } from '../model/user-token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  tryToLogin(userData : User) : Observable<UserToken> {
    
      return this.http.post<UserToken>("api/login/loginUser", userData, {headers:{skip:"true"}});
    
  }
}
