import { Injectable } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { HttpClient } from '@angular/common/http';
import { resourceUsage } from 'process';
import { Observable } from 'rxjs';
import { UserFull } from '../model/user-full';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private result : boolean;

  constructor(private http : HttpClient) { }

  checkValidityOfUsername(value : string) : boolean{

    if(!value.startsWith("@"))
      return false;

    if(value.charAt(1) == "@")
      return false;

    if(value.charAt(1) == "")
      return false;

    if(value.length < 6)
      return false;

    return true;
    
  }

  checkValidityOnServer(value : string) : Observable<boolean> {

    var body = {
      "username" : value
    };

    return this.http.post<boolean>("/api/login/checkValidity", body);
  }

  registerOnServer(user : UserFull) : Observable<boolean>{

    return this.http.post<boolean>("/api/login/register", user);
  }
}
