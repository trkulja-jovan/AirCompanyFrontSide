import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserToken } from '../model/user-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token : string;
  public username : string;
  public isLogged : boolean;

  public userData : UserToken;

  constructor(private http : HttpClient){

  }

  public setToken(token : string){
    this.token = token;
  }

  public setUsername(username : string){
    this.username = username;
  }

  public isLoggedIn() : boolean {
    return this.isLogged;
  }

  public logoutUser() : Observable<boolean> {

    return this.http.post<boolean>("/api/login/logout", this.userData!);
  }

}
